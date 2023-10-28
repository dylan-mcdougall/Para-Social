import React from 'react';
import './CommunityMembersBar.css';

function CommunityMembersBar({ isLoaded, community }) {

    return (
        <div className='community-members-wrapper'>
            <ul className='community-members-ul'>
            {isLoaded && (
                community?.Members?.map((member) => {
                    return (
                        <li className='member-item' key={member.id}>
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
