import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './CommunityPage.css'
import { loadRoom } from '../../store/rooms';
import CommunityRoomsScroll from '../CommunityRoomsScroll';
import RoomDisplay from '../RoomDisplay';
import CommunityMembersBar from '../CommunityMembersBar';

function CommunityPage({ community, dataLoaded, displayRoom, setDisplayRoom }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const [roomDataLoaded, setRoomDataLoaded] = useState(false);

    console.log('Community Page community state: ', community);
    console.log('Community Page room state: ', room);

    useEffect(() => {
        setDisplayRoom(community?.Rooms[0]?.id || null)
    }, [community])

    useEffect(() => {
        async function fetchRoomData() {
            try {
                await dispatch(loadRoom(displayRoom));
                setRoomDataLoaded(true)
            } catch (error) {
                console.log('Error fetching room data: ', error)
            }
        }
        
        fetchRoomData();
    }, [displayRoom, community, dataLoaded])


    return (
        <div className='community-page-wrapper'>
            {dataLoaded && (
                <div className='community-page-content'>
                    <CommunityRoomsScroll roomDataLoaded={roomDataLoaded} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} />
                    <RoomDisplay roomDataLoaded={roomDataLoaded} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} />
                    <CommunityMembersBar />
                </div>
            )}
        </div>
    )
}

export default CommunityPage;
