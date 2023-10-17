import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RoomMessageInput.css';

function RoomMessageInput({ isLoaded }) {
    const dispatch = useDispatch();
    const room = useSelector(state => state.room.room);

    return (
        <>
        <form>
            <label>
                Message
                <input type='text'>

                </input>
            </label>
        </form>
        </>
    )
}

export default RoomMessageInput;
