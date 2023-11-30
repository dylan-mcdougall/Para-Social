const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const { WebSocketServer } = require('ws');
const { RoomMessage, Image } = require('./db/models');

const { environment } = require('./config');
const isProduction = environment === 'production';

const { ValidationError } = require('sequelize');

const routes = require('./routes');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(upload.single('image'));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});

const server = require('http').createServer(app);

const wss = new WebSocketServer({ server })

const messageQueue = [];
const imageQueue = [];

async function processTextQueue() {
    while (messageQueue.length) {
        const message = messageQueue.shift();
        const { room_id, user_id, content_type, content_message, content_src, content_src_name } = message;
        const payload = await RoomMessage.create({
            room_id,
            user_id,
            content_type,
            content_message,
        });
        if (content_type === 'src') {
            const messageId = payload.dataValues.id;
            imageQueue.push({
                content_src,
                content_src_name,
                messageId
            });
            processImageQueue();
            console.log('Image sent to queue.')
        }
        console.log('message created successfully', payload);
    }
    return console.log('Processing completed.');
}

async function processImageQueue() {
    while (imageQueue.length) {
        const image = imageQueue.shift();
        const { content_src, content_src_name, messageId } = image;
        const payload = await Image.create({
            url: content_src,
            name: content_src_name,
            imageableId: messageId,
            imageableType: 'RoomMessage'
        });
        console.log('Image created successfully ', payload);
    }
    return console.log('Processing completed.');
}

const rooms = {};

wss.on('connection', function connection(ws) { 
    ws.on('message', (message) => {
        console.log('Receiving message: ', message)
        const data = JSON.parse(message);
        if (data.action === 'join') {
            const roomId = data.room_id;
            if (!rooms[roomId]) {
                rooms[roomId] = new Set();
            }
            rooms[roomId].add(ws);
            ws.roomId = roomId;
        }

        if (data.action === 'message' && ws.roomId) {
            messageQueue.push(data.data);
            console.log('Sending message to database: ', data);
            processTextQueue()

            rooms[ws.roomId].forEach(client => {
                if (client !== ws && client.readyState) {
                    const parsedData = JSON.stringify(data.data)
                    console.log('Sending Clients message: ', data)
                    client.send(parsedData);
                }
            });

        }
    });

    ws.on('close', () => {
        if (ws.roomId && rooms[ws.roomId]) {
            rooms[ws.roomId].delete(ws);
            if (rooms[ws.roomId].size === 0) {
                delete rooms[ws.roomId];
            }
        }
    });
});

module.exports = server;
