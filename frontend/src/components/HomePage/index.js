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
    const community = useSelector(state => state.community.community);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [displayCommunity, setDisplayCommunity] = useState(null);
    const [promptRender, setPromptRender] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                await dispatch(sessionActions.userData())
                setIsLoaded(true)
            } catch (error) {
                console.log(error);
            }
        }
        if (sessionUser && sessionUser.id) {
            fetchData();
            setDataLoaded(true)
        }

        return () => {
            setPromptRender(false)
        }
    }, [community, promptRender]);


    useEffect(() => {
        if (isLoaded) {
            if (!community) {
                setDisplayCommunity(sessionUser?.Communities[0]?.id || null)
            }
        }
    }, [sessionUser, isLoaded])

    if (!sessionUser) {
        return <Redirect to='/' />
    }

    return (
        <div className='page-wrapper'>
            <div className='home-page-wrapper'>
                <div className='home-page-flex'>
                    {isLoaded ? (
                        <>
                            <CommunityScrollBar displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} setPromptRender={setPromptRender} dataLoaded={dataLoaded} isLoaded={isLoaded} />
                            <CommunityPage promptRender={promptRender} setPromptRender={setPromptRender} dataLoaded={dataLoaded} displayCommunity={displayCommunity} setDisplayCommunity={setDisplayCommunity} isLoaded={isLoaded} />
                        </>
                    ) : (
                        <div>
                            <h1>Loading...</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
