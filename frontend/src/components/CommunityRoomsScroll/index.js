import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { loadRoom } from '../../store/rooms';
import './CommunityRoomsScroll.css'

function CommunityRoomsScroll({ isLoaded, displayRoom, setDisplayRoom }) {
    const dispatch = useDispatch();
    const community = useSelector(state => state.community.community);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        async function fetchRoomData() {
            try {
                await dispatch(loadRoom(displayRoom));
                setDataLoaded(true)
            } catch (error) {
                console.log('Error fetching room data: ', error)
            }
        }

        if (!displayRoom) return setDataLoaded(false);
        
        fetchRoomData();

        return () => {
            setDataLoaded(false)
        }

    }, [dispatch, displayRoom])
    
    return (
        <div className='community-rooms-scroll-wrapper'>
            <ul className='community-rooms-ul'>
                {dataLoaded && (
                    community.Rooms.map((room) => {
                        return (
                            <li className='room-item' key={room.id}>
                                <div className='room-navigation' onClick={() => setDisplayRoom(room.id)}>
                                    {room.name}
                                </div>
                            </li>
                        )
                    })
                )}
            </ul>
        </div>
    )
}

export default CommunityRoomsScroll;
