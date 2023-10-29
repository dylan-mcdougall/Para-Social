import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RoomMessages from '../RoomMessages';
import './RoomDisplay.css';
import RoomMessageInput from '../RoomMessageInput';



function RoomDisplay({ roomMessages, setRoomMessages, clearMessages, setClearMessages, webSocket, displayRoom, setDisplayRoom, roomDataLoaded }) {
    const room = useSelector(state => state.room.room);
    const community = useSelector(state => state.community.community);
    const communityRoomIds = community?.Rooms?.map((el) => el.id)

    useEffect(() => {
        if (community && community?.Rooms && communityRoomIds.includes(displayRoom)) {
            return
        }
        if (community && community?.Rooms) {
            setDisplayRoom(community?.Rooms[0]?.id)
        } else {
            setDisplayRoom(null)
        }
    }, [community])

    return (
        <div className='room-display-wrapper'>
            {roomDataLoaded ? (
                <>
                    {room ?
                        <h4 className='room-heading'>
                            {room?.name || <p>Create a room to get started.</p>}
                        </h4> : (
                            <p>Please create a room first.</p>
                        )}
                    <>
                        <RoomMessages clearMessages={clearMessages} setClearMessages={setClearMessages} displayRoom={displayRoom} webSocket={webSocket} roomMessages={roomMessages} setRoomMessages={setRoomMessages} />
                        <RoomMessageInput clearMessages={clearMessages} setClearMessages={setClearMessages} webSocket={webSocket} />
                    </>
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
