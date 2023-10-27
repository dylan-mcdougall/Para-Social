import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeRoom } from '../../store/rooms';
import { FaPenSquare } from 'react-icons/fa'
import CreateRoomModal from '../CreateRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityRoomsScroll.css'
import UpdateRoomModal from '../UpdateRoomModal';

function CommunityRoomsScroll({ roomDataLoaded, displayRoom, setDisplayRoom }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);

    console.log('Room scroll community check: ', community)
    console.log('Room scroll sessionUser check: ', sessionUser)

    const handleClick = (roomId) => {
        setDisplayRoom(roomId)
        removeRoom()
    }

    if (!community) return null;

    return (
        <div className='community-rooms-scroll-wrapper'>
            <ul className='community-rooms-ul'>
                {roomDataLoaded && (
                    community?.Rooms?.length ? community?.Rooms?.map((room) => {
                        let validatedOwner = null;
                        if (sessionUser.id === community?.creator_id) {
                            validatedOwner = (
                                <>
                                    <OpenModalButton
                                        buttonText={<FaPenSquare />}
                                        modalComponent={() => <UpdateRoomModal communityId={community.id} roomId={room.id} />} />
                                    <OpenModalButton
                                        buttonText={'X'}
                                        modalComponent={() => <DeleteRoomModal setDisplayRoom={setDisplayRoom} roomId={room.id} />} />
                                </>
                            )
                        }
                        return (
                            <li className='room-item' key={room.id}>
                                <div className='room-navigation' onClick={() => handleClick(room.id)}>
                                    {room?.name}
                                    {validatedOwner}
                                </div>
                            </li>
                        )
                    }) : (
                        <li className='room-item missing'>
                            <p>Please create a Room to get started.</p>
                        </li>
                    )
                )}
            </ul>
            <OpenModalButton
                buttonText={'+'}
                modalComponent={() => <CreateRoomModal communityId={community.id} />} />
        </div>
    )
}

export default CommunityRoomsScroll;
