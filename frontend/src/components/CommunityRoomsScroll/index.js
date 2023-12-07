import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSettingsOutline } from "react-icons/io5";
import CreateRoomModal from '../CreateRoomModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityRoomsScroll.css'
import OpenMenuButton from '../OpenMenuButton';
import RoomSettingsMenu from '../RoomSettingsMenu';

function CommunityRoomsScroll({ community, setPromptRender, webSocket, setRoomMessages, dataLoaded, displayRoom, setDisplayRoom }) {
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const [promptRoomScroll, setPromptRoomScroll] = useState(false);

    useEffect(() => {
        if (promptRoomScroll) {
            setPromptRender(true)
        }

        return () => {
            setPromptRoomScroll(false)
        }
    }, [promptRoomScroll])
    
    const handleClick = async (roomId) => {
        if (room.id === roomId) return
        if (webSocket.current) {
            webSocket.current.close()
            setRoomMessages([])
        }
        await setDisplayRoom(roomId)
    }
    let validatedAdd = null;
    if (sessionUser.id === community?.creator_id) {
        validatedAdd = (
            <div className='new-room-button'>
                <OpenModalButton
                    buttonText={'+ Add a Room'}
                    modalComponent={() => <CreateRoomModal setPromptRender={setPromptRender} setPromptRoomScroll={setPromptRoomScroll} setDisplayRoom={setDisplayRoom} webSocket={webSocket} communityId={community.id} />} />
            </div>
        )
    }

    return (
        <div className='community-rooms-scroll-wrapper'>
            <ul className='community-rooms-ul'>
                <h3>
                    {community?.name}
                </h3>
                {dataLoaded && (
                    community?.Rooms ? community?.Rooms?.map((room) => {
                        let validatedOwner = null;
                        if (sessionUser.id === community?.creator_id) {
                            validatedOwner = (
                                <div className='room-actions'>
                                    <OpenMenuButton
                                        buttonIcon={<IoSettingsOutline />}
                                        menuComponent={() => <RoomSettingsMenu community={community} room={room} setPromptRoomScroll={setPromptRoomScroll} setRoomMessages={setRoomMessages} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} setPromptRender={setPromptRender} /> } />
                                </div>
                            )
                        }
                        return (
                            <div className='room-item-wrapper'>
                                <li className='room-item' key={room.id} onClick={() => handleClick(room.id)}>
                                    <div className='item-content'>
                                        {room?.name}
                                        {validatedOwner}
                                    </div>
                                </li>
                            </div>
                        )
                    }) : (
                            <div className='room-item-wrapper missing'>
                                <li className='room-item missing'>
                                    <p>Please create a Room to get started.</p>
                                </li>
                            </div>
                    )
                )}
            </ul>
            {validatedAdd}
        </div>
    )
}

export default CommunityRoomsScroll;
