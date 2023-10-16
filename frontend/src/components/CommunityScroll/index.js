import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './CommunityScroll.css'

function CommunityScrollBar({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    
    return (
        <div className='community-bar-wrapper'>
            {isLoaded && (
                <div>
                    <p>
                        some data
                    </p>
                </div>
            )}
        </div>
    )
}

export default CommunityScrollBar;
