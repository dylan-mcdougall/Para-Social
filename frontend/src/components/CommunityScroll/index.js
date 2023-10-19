import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './CommunityScroll.css'

function CommunityScrollBar({ isLoaded, sessionUser, displayCommunity, setDisplayCommunity }) {
    const dispatch = useDispatch();
    const [dataLoaded, setDataLoaded] = useState(false);
    console.log('Community Scrollbar sessionUser ', sessionUser);

    
    return (
        <div className='community-bar-wrapper'>
            <ul className='community-bar-ul'>
            {isLoaded && (
                sessionUser?.Communities?.map((community) => {
                    return (
                    <li className='community-item' onClick={() => setDisplayCommunity(community.id)} key={community.id}>
                        {community.name}
                    </li>
                    )
                })
            )}
            </ul>
        </div>
    )
}

export default CommunityScrollBar;
