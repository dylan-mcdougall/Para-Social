import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteRoomMessage } from '../../store/rooms';
import { loadRoom } from '../../store/rooms';

function DeleteRoomMessageModal({ roomId, messageId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteRoomMessage(roomId, messageId));
        dispatch(loadRoom(roomId));
        closeModal();
    }

    return (
        <div className='delete-room-message-wrapper'>
            <h3>
                Are you sure you want to delete this message?
            </h3>
            <button className='yes' onClick={() => handleDelete()}>Delete Message</button>
            <button className='no' onClick={() => closeModal()}>No</button>
        </div>
    )
}

export default DeleteRoomMessageModal;
