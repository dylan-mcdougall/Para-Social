import React from 'react';
import './Skeletons.css';

function NavigationSkeleton() {
    return (
        <div className='nav-skeleton-wrapper'>
            <div className='nav-skeleton-item'>
                <div className='nav-skeleton-orb' />
            </div>
            <div className='nav-skeleton-item'>
                <div className='nav-skeleton-orb' />
            </div>
            <div className='nav-skeleton-item'>
                <div className='nav-skeleton-orb' />
            </div>
        </div>
    )
}

export default NavigationSkeleton;
