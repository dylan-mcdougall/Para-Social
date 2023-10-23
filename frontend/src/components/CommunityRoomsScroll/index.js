import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRoom } from '../../store/rooms';
import CreateRoomModal from '../CreateRoomModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityRoomsScroll.css'

function CommunityRoomsScroll({ roomDataLoaded, displayRoom, setDisplayRoom }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const room = useSelector(state => state.room.room);
    const [dataLoaded, setDataLoaded] = useState(false);

    // useEffect(() => {
    //     async function fetchRoomData() {
    //         try {
    //             await dispatch(loadRoom(displayRoom));
    //             setDataLoaded(true)
    //         } catch (error) {
    //             console.log('Error fetching room data: ', error)
    //         }
    //     }

    //     if (!displayRoom) return setDataLoaded(false);
        
    //     fetchRoomData();

    //     return () => {
    //         setDataLoaded(false)
    //     }

    // }, [dispatch, displayRoom, sessionUser])

    if (!community) return null;
    
    return (
        <div className='community-rooms-scroll-wrapper'>
            <ul className='community-rooms-ul'>
                {roomDataLoaded && (
                    community?.Rooms?.length ? community?.Rooms?.map((room) => {
                        return (
                            <li className='room-item' key={room.id}>
                                <div className='room-navigation' onClick={() => setDisplayRoom(room.id)}>
                                    {room.name}
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
