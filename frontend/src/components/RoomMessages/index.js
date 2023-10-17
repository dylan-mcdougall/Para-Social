import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RoomMessages.css';

function RoomMessages({ isLoaded }) {
    const room = useSelector(state => state.room.room);

    return (
        <>
            {isLoaded && (
                <div className='room-messages-wrapper'>
                    <ul className='room-messages-ul'>
                    {room?.Messages?.map((message) => {
                        return (
                            <li className='message-item' key={message.id}>
                                {message.content_message}
                            </li>
                        )
                    })}
                    </ul>
                </div>
            )}
        </>
    )
}

export default RoomMessages;
