import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomMessages from '../RoomMessages';
import './RoomDisplay.css';
import RoomMessageInput from '../RoomMessageInput';



function RoomDisplay({ roomMessages, setRoomMessages, clearMessages, setClearMessages, webSocket, setDisplayCommunity, displayRoom, setDisplayRoom, roomDataLoaded }) {
    const room = useSelector(state => state.room.room);
    
    return (
        <div className='room-display-wrapper'>
            {roomDataLoaded ? (
                <>
                    {room?.name}
                    <div>
                        <RoomMessages clearMessages={clearMessages} setClearMessages={setClearMessages} displayRoom={displayRoom} webSocket={webSocket} roomMessages={roomMessages} setRoomMessages={setRoomMessages} />
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
