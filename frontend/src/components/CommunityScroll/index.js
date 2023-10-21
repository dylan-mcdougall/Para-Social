import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateCommunityModal from '../CreateCommunityModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityScroll.css'

function CommunityScrollBar({ isLoaded, displayCommunity, setDisplayCommunity }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!community) setDataLoaded(false);
        else setDataLoaded(true)
    }, [community])
    
    return (
        <div className='community-bar-wrapper'>
            <ul className='community-bar-ul'>
            {dataLoaded && (
                sessionUser?.Communities?.map((community) => {
                    return (
                    <li className='community-item' onClick={() => setDisplayCommunity(community.id)} key={community.id}>
                        {community.name}
                    </li>
                    )
                })
            )}
            </ul>
            <OpenModalButton
                buttonText={'+'}
                modalComponent={() => <CreateCommunityModal />} />
        </div>
    )
}

export default CommunityScrollBar;
