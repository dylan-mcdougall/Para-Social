import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const port = process.env.REACT_APP_WS_URL || 'ws://localhost:8000';

function TempRoomServer() {
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState(sessionUser.username);
    const [message, setMessage] = useState('');
    const webSocket = useRef(null);
    console.log(username);
    useEffect(() => {
        if (!username) return;

        const ws = new WebSocket(port);
        webSocket.current = ws;

        ws.onopen = (e) => {
            console.log(`connected ${e}`);
        }

        ws.onmessage = (e) => {
            console.log(e);
        }

        ws.onerror = (e) => {
            console.log(e);
        }

        ws.onclose = (e) => {
            console.log(`connection closed ${e}`);
        }

        return function cleanup() {
            if (webSocket.current !== null) webSocket.current.close();
        }
    }, [username]);

    const updateUsername = (username) => {
        setUsername(username);
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            id: 1,
            username,
            message: message,
            created: new Date()
        }

        const jsonMessage = JSON.stringify({
            type: 'send-message',
            data: newMessage
        });

        console.log(`Sending data: ${jsonMessage}`);

        webSocket.current.send(jsonMessage);
    }

    return (
        <div>
            <form onSubmit={e => handleSendMessage(e)}>
                <label>
                    Send Message
                    <input type='text' value={message} onChange={e => setMessage(e.target.value)} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default TempRoomServer;
