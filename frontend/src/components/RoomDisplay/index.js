import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RoomDisplay.css';

function RoomDisplay({ isLoaded }) {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room.room);
    
    
    return (
        <div className='room-display-wrapper'>
            {room.name}
        </div>
    )
}

export default RoomDisplay;
