import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomMessages from '../RoomMessages';
import './RoomDisplay.css';
import RoomMessageInput from '../RoomMessageInput';

function RoomDisplay({ isLoaded }) {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room.room);
    
    return (
        <div className='room-display-wrapper'>
            {isLoaded && (
                <>
                {room?.name}
                <div>
                    <RoomMessages isLoaded={isLoaded} />
                    <RoomMessageInput isLoaded={isLoaded} />
                </div>
                </>
            )}
        </div>
    )
}

export default RoomDisplay;
