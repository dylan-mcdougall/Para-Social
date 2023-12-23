import React from 'react';
import './404NotFounds.css';

function ExploreNotFound() {

    return (
        <div className='not-found-wrapper explore'>
            <div className='not-found-level-1'>
                <img className='not-found-image' src='https://aaprojectbucket.s3.us-west-1.amazonaws.com/%E2%80%94Pngtree%E2%80%94cartoon+doubt+lovely+expression_3911236.png' alt='Thumbnail' />
                <a className='attribution' href='https://pngtree.com/freepng/cartoon-doubt-lovely-expression_3911236.html'>png image from pngtree.com/</a>
            </div>
            <div className='not-found-level-2'>
                <p className='not-found-message'>
                    Looks like there are no Communities that contain that query.
                </p>
            </div>
        </div>
    )
}

export default ExploreNotFound;
