import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteCommunity } from '../../store/community';

function DeleteCommunityModal({ setDisplayCommunity }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const community = useSelector(state => state.community.community);
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteCommunity(community.id));
        setDisplayCommunity(sessionUser?.Communities[0]?.id);
        closeModal();
    }

    return (
        <div className='delete-community-wrapper'>
            <h3>
                Are you sure you want to delete this community?
            </h3>
            <button className='yes' onClick={() => handleDelete()}>Delete Community</button>
            <button className='no' onClick={() => closeModal()}>No</button>
        </div>
    )
}

export default DeleteCommunityModal;
