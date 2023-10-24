import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateCommunityModal from '../CreateCommunityModal';
import OpenModalButton from '../OpenModalButton';
import './CommunityScroll.css'
import { loadCommunity } from '../../store/community';
import UpdateCommunityModal from '../UpdateCommunityModal';

function CommunityScrollBar({ displayCommunity, setDisplayCommunity }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadCommunity(displayCommunity))
        setDataLoaded(true)
    }, [setDisplayCommunity])
    
    return (
        <div className='community-bar-wrapper'>
            <ul className='community-bar-ul'>
            {dataLoaded && (
                sessionUser?.Communities?.map((community) => {
                    return (
                    <li className='community-item' onClick={() => setDisplayCommunity(community.id)} key={community.id}>
                        {community.name}
                        <OpenModalButton
                        buttonText={'...'}
                        modalComponent={() => <UpdateCommunityModal communityId={community.id} />} />
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
