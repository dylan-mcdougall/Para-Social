import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RoomMessages.css';
import { loadRoom } from '../../store/rooms';

function RoomMessages({ isLoaded, clearMessages, setClearMessages, displayRoom, roomMessages, setRoomMessages }) {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room.room);
    const sessionUser = useSelector(state => state.session.user);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        console.log('room object: ', room);
        console.log('roomMessages: ', roomMessages)
    }, [roomMessages]);

    useEffect(() => {
        if (clearMessages) {
            setRoomMessages([]);
            setClearMessages(false)
        }
    }, [displayRoom, clearMessages]);

    useEffect(() => {
        dispatch(loadRoom(displayRoom));
        setDataLoaded(true)
    }, [roomMessages]);

    const combinedMessages = room?.Messages ? [...room.Messages, ...roomMessages] : roomMessages;

    return (
        <>
            {isLoaded && (
                <div className='room-messages-wrapper'>
                    <ul className='room-messages-ul'>
                        <div>
                            {combinedMessages.map((message, index) => {
                                return (
                                    <li className='message-item' key={message.id || index}>
                                        {message?.content_message || message.data.content_message}
                                    </li>
                                )
                            })}
                        </div>
                    </ul>
                </div>
            )}
        </>
    );
}

export default RoomMessages;
