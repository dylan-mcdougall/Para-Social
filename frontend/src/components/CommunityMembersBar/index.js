import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CommunityMembersBar.css';

function CommunityMembersBar({ isLoaded }) {
    const dispatch = useDispatch();
    const community = useSelector(state => state.community.community);

    return (
        <div className='community-members-wrapper'>
            <ul className='community-members-ul'>
            {isLoaded && (
                community?.Members?.map((member) => {
                    return (
                        <li className='member-item'>
                            {member.username}
                        </li>
                    )
                })
            )}
            </ul>
        </div>
    )
}

export default CommunityMembersBar;
