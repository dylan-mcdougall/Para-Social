import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './RoomMessageInput.css';

function RoomMessageInput({ isLoaded, webSocket, clearMessages, setClearMessages }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const [message, setMessage] = useState('');
    const [content_type, setContent_type] = useState('src');
    const [content_src, setContent_src] = useState(null);
    const [content_src_name, setContent_src_name] = useState(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            id: uuidv4(),
            room_id: room?.id,
            user_id: sessionUser?.id,
            content_type: content_type,
            content_message: message,
            content_src: content_src ? content_src : null,
            content_src_name: content_src_name ? content_src_name : null,
            username: sessionUser.username,
            created: new Date()
        }

        const jsonMessage = JSON.stringify({
            type: 'send-message',
            data: newMessage
        });

        console.log(`Sending data: ${jsonMessage}`);

        webSocket.current.send(jsonMessage);
        setClearMessages(true);
    }

    if (!room) return null;

    return (
        <>
            <form onSubmit={e => handleSendMessage(e)}>
                <label>
                    Send Message
                    <input type='text' value={message} onChange={e => setMessage(e.target.value)} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default RoomMessageInput;
