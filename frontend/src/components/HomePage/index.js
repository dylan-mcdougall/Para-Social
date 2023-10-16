import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import CommunityScrollBar from '../CommunityScroll';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                await dispatch(sessionActions.userData())
                setIsLoaded(true)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }   
        fetchData();

        return () => {
            setIsLoaded(false)
        }
    }, [dispatch])

    // if (!sessionUser) {
    //     history.push('/')
    //     return
    // }


    return (
        <div className='home-page-wrapper'>
            {isLoaded ? (
                <CommunityScrollBar isLoaded={isLoaded} />
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </div>
    );
}

export default HomePage;
