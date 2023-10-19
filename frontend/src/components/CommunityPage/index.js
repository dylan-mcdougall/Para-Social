import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './CommunityPage.css'
import { loadCommunity } from '../../store/community';
import CommunityRoomsScroll from '../CommunityRoomsScroll';
import RoomDisplay from '../RoomDisplay';
import CommunityMembersBar from '../CommunityMembersBar';

function CommunityPage({ isLoaded, sessionUser, displayCommunity, setDisplayCommunity }) {
    const dispatch = useDispatch();
    const community = useSelector(state => state.community.community);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [displayRoom, setDisplayRoom] = useState(null);

    useEffect(() => {
        async function fetchCommunityData() {
            try {
                await dispatch(loadCommunity(displayCommunity))
                setDataLoaded(true);
            } catch (error) {
                console.log('Error fetching community data: ', error);
            }
        }
        
        
        if (!sessionUser.Communities) {
            return setDataLoaded(false);
        }
        
        fetchCommunityData()

        return () => {
            setDataLoaded(false)
        }
    }, [dispatch, displayCommunity]);

    useEffect(() => {
        if (community?.Rooms?.length > 0) {
            setDisplayRoom(community.Rooms[0].id);
        }
    }, [community]);

    return (
        <div className='community-page-wrapper'>
            {isLoaded && (
                <div>
                    {dataLoaded && (
                        <div className='community-page-content'>
                            <CommunityRoomsScroll isLoaded={isLoaded} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} />
                            <RoomDisplay displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} isLoaded={isLoaded} />
                            <CommunityMembersBar isLoaded={isLoaded} />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CommunityPage;
