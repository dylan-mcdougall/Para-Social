import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomMessages from '../RoomMessages';
import './RoomDisplay.css';
import RoomMessageInput from '../RoomMessageInput';
import { v4 as uuidv4 } from 'uuid';
import { deleteRoom } from '../../store/rooms';
import { loadCommunity } from '../../store/community';

const wsUrl = process.env.NODE_ENV === 'production' ? 'wss://para-social.onrender.com' : 'ws://localhost:8000';

function RoomDisplay({ setDisplayCommunity, displayRoom, setDisplayRoom, roomDataLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const room = useSelector(state => state.room.room);
    const webSocket = useRef(null);
    const [roomMessages, setRoomMessages] = useState([]);
    const [clearMessages, setClearMessages] = useState(false);

    useEffect(() => {
        if (!room) return
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
    }, [displayRoom, setRoomMessages, setClearMessages, room]);

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteRoom(community.id, room.id));
        dispatch(loadCommunity(community.id));
        setDisplayRoom(community?.Rooms[0]?.id);
    }
    
    return (
        <div className='room-display-wrapper'>
            {roomDataLoaded ? (
                <>
                    {room?.name}
                    <button onClick={handleDelete}>Delete Room</button>
                    <div>
                        <RoomMessages room={room} clearMessages={clearMessages} setClearMessages={setClearMessages} displayRoom={displayRoom} webSocket={webSocket} roomMessages={roomMessages} setRoomMessages={setRoomMessages} />
                        <RoomMessageInput clearMessages={clearMessages} setClearMessages={setClearMessages} webSocket={webSocket} />
                    </div>
                </>
            ) : (
                <>
                    <p>Please create a room to get started</p>
                </>
            )}
        </div>
    )
}

export default RoomDisplay;
