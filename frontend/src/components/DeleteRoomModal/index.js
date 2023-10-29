import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteRoom } from '../../store/rooms';
import { loadCommunity } from '../../store/community';

function DeleteRoomModal({ setDisplayRoom, roomId }) {
    const dispatch = useDispatch();
    const community = useSelector(state => state.community.community);
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteRoom(community.id, roomId));
        dispatch(loadCommunity(community.id))
        setDisplayRoom(community?.Rooms[0]?.id);
        closeModal()
    }

    return (
        <div className='delete-modal'>
            <h3>
                Are you sure you want to delete this room?
            </h3>
            <div className='delete-buttons'>
                <button className='yes' onClick={() => handleDelete()}>Delete Room</button>
                <button className='no' onClick={() => closeModal()}>No</button>
            </div>
        </div>
    )
}

export default DeleteRoomModal;
