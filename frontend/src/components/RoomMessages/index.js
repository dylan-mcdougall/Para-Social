import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RoomMessages.css';
import { loadRoom } from '../../store/rooms';

function RoomMessages({ isLoaded, room, clearMessages, setClearMessages, displayRoom, roomMessages, setRoomMessages }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadRoom(displayRoom));
        setDataLoaded(true)
        if (clearMessages) {
            setRoomMessages([]);
            setClearMessages(false);
        }
        if (!room?.Messages?.length) {
            return;
        }
        roomMessages = roomMessages.filter(msg => !msg.tempId);
    }, [displayRoom, clearMessages, setRoomMessages]);

    return (
        <>
            {dataLoaded && (
                <div className='room-messages-wrapper'>
                    <ul className='room-messages-ul'>
                        <div>
                            {room?.Messages?.length ? (
                                room.Messages.map((message) => (
                                    <li className='message-item' key={message.id}>
                                        {message?.content_message}
                                        {message?.createdAt}
                                    </li>
                                ))
                            ) : (
                                roomMessages.map((message, index) => (
                                    <li className='message-item' key={message.id || index}>
                                        {message?.content_message || message?.data?.content_message}
                                        {message?.createdAt || message?.data?.created}
                                    </li>
                                ))
                            )}
                        </div>
                    </ul>
                </div>
            )}
        </>
    );
}

export default RoomMessages;
