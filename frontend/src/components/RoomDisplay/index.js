import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomMessages from '../RoomMessages';
import './RoomDisplay.css';

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
                </div>
                </>
            )}
        </div>
    )
}

export default RoomDisplay;
