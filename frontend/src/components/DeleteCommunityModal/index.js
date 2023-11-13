import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal/Modal';
import { deleteCommunity } from '../../store/community';

function DeleteCommunityModal({ setPromptRender, community }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        setPromptRender(true);
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
