import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { loadCommunity } from '../../store/community';
import CommunityScrollBar from '../CommunityScroll';
import './HomePage.css';
import CommunityPage from '../CommunityPage';
import { removeRoom } from '../../store/rooms';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const room = useSelector(state => state.room.room)
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [displayCommunity, setDisplayCommunity] = useState(null);
    const [displayRoom, setDisplayRoom] = useState(null);
    const [allowRoom, setAllowRoom] = useState(false);

    console.log('Home Page community check: ', community);

    useEffect(() => {
        async function fetchData() {
            try {
                await dispatch(sessionActions.userData())
                setIsLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }   
        fetchData();
    }, [community]);

    useEffect(() => {
        if (isLoaded) {
            if (community) {
                setDisplayCommunity(community.id)
            } else {
                setDisplayCommunity(sessionUser?.Communities[0]?.id || null)
            }
        }
    }, [sessionUser, isLoaded])

    useEffect(() => {
        if (!displayCommunity) return 
        async function fetchCommunityData() {
            try {
                await dispatch(loadCommunity(displayCommunity))
                setDataLoaded(true)
            } catch (error) {
                console.log('Error fetching community data: ', error);
            }
        }
        fetchCommunityData();
        setAllowRoom(true)

        return () => {
            setDataLoaded(false)
        }
    }, [displayCommunity]);

    useEffect(() => {
        if (community?.Rooms) {
            setDisplayRoom(community?.Rooms[0]?.id)
        }
    }, [community])

    if (!sessionUser) {
        return <Redirect to='/' />
    }


    return (
        <div className='home-page-wrapper'>
            {isLoaded ? (
                <>
                <CommunityScrollBar allowRoom={allowRoom} setAllowRoom={setAllowRoom} displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} setDisplayRoom={setDisplayRoom} isLoaded={isLoaded} />
                <CommunityPage allowRoom={allowRoom} setAllowRoom={setAllowRoom} displayRoom={displayRoom} setDisplayRoom={setDisplayRoom} dataLoaded={dataLoaded} displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} isLoaded={isLoaded} />
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
