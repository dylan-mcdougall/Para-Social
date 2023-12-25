import React from 'react';
import './Skeletons.css';

function CommunityScrollSkeleton () {
    return (
        <div className='skeleton-wrapper comm-scroll'>
            <div className='skeleton-content comm-item'>
                <div className='skeleton-orb' />
            </div>
            <div className='skeleton-content comm-item'>
                <div className='skeleton-orb' />
            </div>
            <div className='skeleton-content comm-item'>
                <div className='skeleton-orb' />
            </div>
            <div className='skeleton-content comm-item'>
                <div className='skeleton-orb' />
            </div>
            <div className='skeleton-content comm-item'>
                <div className='skeleton-orb' />
            </div>
        </div>
    )
}

export default CommunityScrollSkeleton;
