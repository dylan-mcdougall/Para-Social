import React from 'react';
import './Skeletons.css';

function ExploreCommunitiesSkeleton() {

    return (
        <div className='skeleton-wrapper'>
            <div className='skeleton-content'>
                <div className='skeleton-level-1'>
                    <div className='skeleton-image image-item' />
                    <div className='skeleton-text-short' />
                </div>
                <div className='skeleton-level-2'>
                    <div className='skeleton-text-long' />
                    <div className='skeleton-text-long' />
                    <div className='skeleton-text-long' />
                </div>
            </div>
            <div className='skeleton-content'>
                <div className='skeleton-level-1'>
                    <div className='skeleton-image image-item' />
                    <div className='skeleton-text-short' />
                </div>
                <div className='skeleton-level-2'>
                    <div className='skeleton-text-long' />
                    <div className='skeleton-text-long' />
                    <div className='skeleton-text-long' />
                </div>
            </div>
            <div className='skeleton-content'>
                <div className='skeleton-level-1'>
                    <div className='skeleton-image image-item' />
                    <div className='skeleton-text-short' />
                </div>
                <div className='skeleton-level-2'>
                    <div className='skeleton-text-long' />
                    <div className='skeleton-text-long' />
                    <div className='skeleton-text-long' />
                </div>
            </div>
        </div>
    )
}

export default ExploreCommunitiesSkeleton;
