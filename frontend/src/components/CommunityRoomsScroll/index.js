import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPenSquare } from 'react-icons/fa'
import CreateRoomModal from '../CreateRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityRoomsScroll.css'
import UpdateRoomModal from '../UpdateRoomModal';
import { loadCommunity } from '../../store/community';
import { separatedRooms } from './roomManagement';

function CommunityRoomsScroll({ community, webSocket, dataLoaded, displayRoom, setDisplayRoom }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const community = useSelector(state => state.community.community);
    const [promptRoomScroll, setPromptRoomScroll] = useState(false);
    const [scrollDataLoaded, setScrollDataLoaded] = useState(false);

    console.log(community)

    // useEffect(() => {
    //     if (dataLoaded && community) {
    //         dispatch(loadCommunity(community.id))
    //         setScrollDataLoaded(true)
    //     }
        
    //     return () => {
    //         setPromptRoomScroll(false)
    //     }
    // }, [promptRoomScroll])

    useEffect(() => {
        if (community) {
            const { pinnedRooms, rooms } = separatedRooms(community?.Rooms)
        }
        return () => {
            setScrollDataLoaded(false)
        }
    }, [community])
    
    const handleClick = async (roomId) => {
        if (webSocket.current) {
            webSocket.current.close()
        }
        await setDisplayRoom(roomId)
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
                                    <OpenModalButton
                                        buttonText={<FaPenSquare />}
                                        modalComponent={() => <UpdateRoomModal setPromptRoomScroll={setPromptRoomScroll} communityId={community.id} room={room} />} />
                                    <OpenModalButton
                                        buttonText={'X'}
                                        modalComponent={() => <DeleteRoomModal setPromptRoomScroll={setPromptRoomScroll} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} roomId={room.id} />} />
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
                        <li className='room-item missing'>
                            <p>Please create a Room to get started.</p>
                        </li>
                    )
                )}
            </ul>
            <div className='new-room-button'>
                <OpenModalButton
                    buttonText={'+ Add a Room'}
                    modalComponent={() => <CreateRoomModal setPromptRoomScroll={setPromptRoomScroll} setDisplayRoom={setDisplayRoom} webSocket={webSocket} communityId={community.id} />} />
            </div>
        </div>
    )
}

export default CommunityRoomsScroll;
