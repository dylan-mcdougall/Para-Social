import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './CommunityPage.css'
import { loadRoom } from '../../store/rooms';
import { deleteCommunity } from '../../store/community';
import CommunityRoomsScroll from '../CommunityRoomsScroll';
import RoomDisplay from '../RoomDisplay';
import CommunityMembersBar from '../CommunityMembersBar';

function CommunityPage({ community, dataLoaded, displayCommunity, setDisplayCommunity, displayRoom, setDisplayRoom }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const room = useSelector(state => state.room.room);
    const [roomDataLoaded, setRoomDataLoaded] = useState(false);

    console.log('Community Page community state: ', community);
    console.log('Community Page room state: ', room);

    useEffect(() => {
        setDisplayRoom(room?.id || community?.Rooms[0]?.id || null)
    }, [community, room])

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

        return () => {
            setRoomDataLoaded(false)
        }
    }, [displayRoom, community, dataLoaded, displayCommunity])

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCommunity(community.id));
        setDisplayCommunity(sessionUser?.Communities[0]?.id);
    }

    return (
        <div className='community-page-wrapper'>
            <button onClick={handleDelete}>Delete Community</button>
            {dataLoaded && (
                <div className='community-page-content'>
                    <CommunityRoomsScroll roomDataLoaded={roomDataLoaded} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} />
                    <RoomDisplay setDisplayCommunity={setDisplayCommunity} roomDataLoaded={roomDataLoaded} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} />
                    <CommunityMembersBar />
                </div>
            )}
        </div>
    )
}

export default CommunityPage;
