import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal/Modal';
import { deleteCommunity } from '../../store/community';
import { removeRoom } from '../../store/rooms';

function DeleteCommunityModal({ displayCommunity, setDisplayCommunity, user, setPromptRender, community }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        dispatch(deleteCommunity(community.id));
        dispatch(removeRoom());
        if (displayCommunity === community.id) {
            setDisplayCommunity(user.Communities[0].id)
        }
        setPromptRender(true);
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
