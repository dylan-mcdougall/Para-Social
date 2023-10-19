import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import CommunityScrollBar from '../CommunityScroll';
import './HomePage.css';
import CommunityPage from '../CommunityPage';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayCommunity, setDisplayCommunity] = useState(null);

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
    }, [dispatch]);

    useEffect(() => {
        if (sessionUser?.Communities?.length > 0) {
            setDisplayCommunity(sessionUser.Communities[0].id);
        }
    }, [sessionUser, dispatch]);

    if (!sessionUser) {
        return <Redirect to='/' />
    }


    return (
        <div className='home-page-wrapper'>
            {isLoaded ? (
                <>
                <CommunityScrollBar displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} sessionUser={sessionUser} isLoaded={isLoaded} />
                <CommunityPage displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} sessionUser={sessionUser} isLoaded={isLoaded} />
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
