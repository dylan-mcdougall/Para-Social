import React from 'react';
import { useModal } from '../../context/Modal/Modal';
import ExploreCommunities from '../ExploreCommunities';

function ExploreCommunitiesModal() {
    const { closeModal } = useModal();

    return (
        <div className='modal-wrapper'>
            <ExploreCommunities />
        </div>
    )
}

export default ExploreCommunitiesModal;
