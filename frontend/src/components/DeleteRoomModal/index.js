import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal/Modal';
import { deleteRoom, loadRoom } from '../../store/rooms';
import { loadCommunity } from '../../store/community';

function DeleteRoomModal({ setPromptRoomScroll, displayRoom, setDisplayRoom, roomId }) {
    const dispatch = useDispatch();
    const community = useSelector(state => state.community.community);
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteRoom(community.id, roomId));
        if (displayRoom === roomId) {
            setDisplayRoom(community?.Rooms[0]?.id);
        }
        setPromptRoomScroll(true)
        dispatch(loadRoom(community?.Rooms[0]?.id))
        dispatch(loadCommunity(community.id))
        closeModal();
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
