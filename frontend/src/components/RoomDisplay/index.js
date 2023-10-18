import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomMessages from '../RoomMessages';
import './RoomDisplay.css';
import RoomMessageInput from '../RoomMessageInput';
import { v4 as uuidv4 } from 'uuid';

const wsUrl = process.env.NODE_ENV === 'production' ? 'wss://para-social.onrender.com' : 'ws://localhost:8000';

function RoomDisplay({ isLoaded, displayRoom, setDisplayRoom }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const webSocket = useRef(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const [clearMessages, setClearMessages] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        webSocket.current = ws;

        ws.onopen = (e) => {
            console.log(`connected ${e}`);
        }

        ws.onmessage = (e) => {
            const parsedData = JSON.parse(e.data);
            parsedData.tempId = uuidv4();
            return setRoomMessages(roomMessages => [...roomMessages, parsedData]);
        }

        ws.onerror = (e) => {
            console.log(e);
        }

        ws.onclose = (e) => {
            console.log(`connection closed ${e}`);
            return webSocket.current = null;
        }

        return function() {
            return webSocket.current = null;
        }
    }, [displayRoom, setRoomMessages, setClearMessages]);
    
    return (
        <div className='room-display-wrapper'>
            {isLoaded && (
                <>
                {room?.name}
                <div>
                    <RoomMessages room={room} clearMessages={clearMessages} setClearMessages={setClearMessages} displayRoom={displayRoom} isLoaded={isLoaded} webSocket={webSocket} roomMessages={roomMessages} setRoomMessages={setRoomMessages} />
                    <RoomMessageInput clearMessages={clearMessages} setClearMessages={setClearMessages} isLoaded={isLoaded} webSocket={webSocket} />
                </div>
                </>
            )}
        </div>
    )
}

export default RoomDisplay;
