import React from 'react';
import './CommunityMembersBar.css';

function CommunityMembersBar({ isLoaded, community }) {

    return (
        <div className='community-members-wrapper'>
            <ul className='community-members-ul'>
                <h3>
                    Community Members ({community?.Members?.length})
                </h3>
            {isLoaded && (
                community?.Members?.map((member) => {
                    return (
                        <div className='member-item-wrapper'>
                        <li className='member-item' key={member.id}>
                            {member.username}
                        </li>
                        </div>
                    )
                })
            )}
            </ul>
        </div>
    )
}

export default CommunityMembersBar;
