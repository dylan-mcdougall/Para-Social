import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { csrfFetch } from '../../store/csrf';
import './RoomMessageInput.css';

const wsUrl = process.env.NODE_ENV === 'production' ? 'wss://para-social.onrender.com' : 'ws://localhost:8000';

function RoomMessageInput({ isLoaded, webSocket, clearMessages, setClearMessages }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const [message, setMessage] = useState('');
    const [content_type, setContent_type] = useState('text');
    const [content_src, setContent_src] = useState(null);
    const [content_src_name, setContent_src_name] = useState(null);
    const fileRef = useRef(null);
    
    if (webSocket.current === null) {
        const ws = new WebSocket(wsUrl);
        webSocket.current = ws;
    }
    
    const onFileUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('image', file, file.name);
        formData.append('content_type', 'src');
        const response = await csrfFetch(`/api/rooms/${room.id}/image`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json()
        setContent_type('src');
        setContent_src(data.content_src);
        setContent_src_name(data.content_src_name);
    }

    const handleRemoveImage = async () => {
        setContent_type('text');
        setContent_src(null);
        setContent_src_name(null);
        const response = await csrfFetch(`/api/rooms/${room.id}/images/${content_src_name}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            console.log('Error deleting image: ', response)
        }
    }

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
        setMessage('');
        setClearMessages(true);
        setContent_type('text');
        setContent_src(null);
        setContent_src_name(null);
        if (fileRef.current) {
            fileRef.current.value = ''
        }
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
            <form onSubmit={onFileUpload}>
                <input type='file' ref={fileRef} formEncType='multipart/form-data' name='image' accept='image/*' onChange={(e) => onFileUpload(e)} />
                {content_src && (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img src={content_src} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
                        <button style={{ position: 'absolute', right: 0, top: 0 }} onClick={handleRemoveImage}>X</button>
                    </div>
                )}

            </form>
        </>
    )
}

export default RoomMessageInput;
