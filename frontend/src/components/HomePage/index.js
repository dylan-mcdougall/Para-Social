import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { loadCommunity } from '../../store/community';
import CommunityScrollBar from '../CommunityScroll';
import './HomePage.css';
import CommunityPage from '../CommunityPage';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const room = useSelector(state => state.room.room)
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [displayCommunity, setDisplayCommunity] = useState(1);
    const [displayRoom, setDisplayRoom] = useState(null);

    console.log('Home Page community check: ', community);

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch(sessionActions.userData())
                setIsLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }   
        fetchData();
    }, [dispatch, community]);

    useEffect(() => {
        if (community) return setDisplayCommunity(community.id);
        if (sessionUser?.Communities?.length > 0) {
            setDisplayCommunity(sessionUser.Communities[0].id);
        }

    }, [sessionUser, community]);

    useEffect(() => {
        async function fetchCommunityData() {
            try {
                await dispatch(loadCommunity(displayCommunity))
                setDataLoaded(true)
            } catch (error) {
                console.log('Error fetching community data: ', error);
            }
        }
        
        fetchCommunityData()

        return () => {
            setDataLoaded(false)
        }
    }, [dispatch, displayCommunity, isLoaded]);

    if (!sessionUser) {
        return <Redirect to='/' />
    }


    return (
        <div className='home-page-wrapper'>
            {isLoaded ? (
                <>
                <CommunityScrollBar displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} isLoaded={isLoaded} />
                <CommunityPage displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} dataLoaded={dataLoaded} community={community} displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} isLoaded={isLoaded} />
                </>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
    );
}

export default HomePage;
