import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { csrfFetch } from '../../store/csrf';
import { FaPaperPlane } from 'react-icons/fa';
import './RoomMessageInput.css';

const wsUrl = process.env.NODE_ENV === 'production' ? 'wss://para-social.onrender.com' : 'ws://localhost:8000';

function RoomMessageInput({ webSocket, roomMessages, setRoomMessages }) {
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const [message, setMessage] = useState('');
    const [content_type, setContent_type] = useState('text');
    const [content_src, setContent_src] = useState(null);
    const [content_src_name, setContent_src_name] = useState(null);
    const [errors, setErrors] = useState({});
    const fileRef = useRef(null);
    const formRef = useRef(null);
    const imageFile = document.getElementsByName('image');
    
    const onFileUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('image', file, file.name);
        formData.append('content_type', 'src');
        const response = await csrfFetch(`/api/rooms/${room.id}/image-preview`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json()
        setContent_type('src');
        setContent_src(data.url);
        setContent_src_name(data.name);
    }

    const handleRemoveImage = async () => {
        setContent_type('text');
        setContent_src(null);
        setContent_src_name(null);
        fileRef.current = null;
        imageFile[0].value = ""
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
        setErrors({});
        console.log(message)
        if ((!message && !content_src) || (!message.split(' ').join('').length && !content_src)) {
            return setErrors({
                errors: "A message cannot be empty."
            })
        }
        const newMessage = {
            room_id: room?.id,
            user_id: sessionUser?.id,
            ws_message_id: uuidv4(),
            content_type: content_type,
            content_message: message,
            content_src: content_src ? content_src : null,
            content_src_name: content_src_name ? content_src_name : null,
            username: sessionUser.username,
            created: new Date()
        }
        setRoomMessages([...roomMessages, newMessage])

        const jsonMessage = JSON.stringify({
            action: 'message',
            data: newMessage
        });

        console.log(`Sending data: ${jsonMessage}`);


        webSocket.current.send(jsonMessage);
        setMessage('');
        setContent_type('text');
        setContent_src(null);
        setContent_src_name(null);
        if (fileRef.current) {
            fileRef.current.value = ''
        }
    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          formRef.current.requestSubmit();
        }
    }

    console.log('roomMessages, ', roomMessages)

    if (!room) return null;

    return (
        <div className='room-message-input-wrapper'>
            <form ref={formRef} onSubmit={e => handleSendMessage(e)}>
                <label>
                    <textarea type='text' onKeyDown={e => onEnterPress(e)} rows={2} placeholder={`Message ${room.name}`} value={message} onChange={e => setMessage(e.target.value)} />
                </label>
                    <button className='submit-message' disabled={errors.length} type='submit'><FaPaperPlane /></button>
            </form>
            {errors && <p className='errors'>{errors.errors}</p>}
                    <form className='file-upload' onSubmit={onFileUpload}>
                        <input type='file' ref={fileRef} formEncType='multipart/form-data' name='image' accept='image/*' onChange={(e) => onFileUpload(e)} />
                        {content_src && (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src={content_src} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
                                <button style={{ color: 'red', position: 'absolute', right: 0, top: 0 }} onClick={handleRemoveImage}>X</button>
                            </div>
                        )}
                    </form>
        </div>
    )
}

export default RoomMessageInput;
