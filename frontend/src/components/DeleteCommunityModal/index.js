import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteCommunity } from '../../store/community';

function DeleteCommunityModal({ setDisplayCommunity, community }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const handleDelete = () => {
        setDisplayCommunity(sessionUser?.Communities[0]?.id);
        dispatch(deleteCommunity(community.id));
        closeModal();
    }

    return (
        <div className='delete-modal'>
            <h3>
                Are you sure you want to delete this community?
            </h3>
            <div className='delete-buttons'>
                <button className='yes' onClick={() => handleDelete()}>Delete Community</button>
                <button className='no' onClick={() => closeModal()}>No</button>
            </div>
        </div>
    )
}

export default DeleteCommunityModal;
