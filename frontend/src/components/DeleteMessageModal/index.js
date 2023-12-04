import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal/Modal';
import { deleteRoomMessage } from '../../store/rooms';

function DeleteRoomMessageModal({ webSocket, roomMessages, setRoomMessages, roomId, messageId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deleteRoomMessage(roomId, messageId));

        const deleteAction = {
            action: 'delete',
            data: {
                ws_message_id: messageId
            }
        };

        webSocket.current.send(JSON.stringify(deleteAction));

        const newMessages = roomMessages.filter((el) => el.ws_message_id !== messageId)
        await setRoomMessages([...newMessages])
        closeModal();
    }

    return (
        <div className='delete-modal'>
            <h3>
                Are you sure you want to delete this message?
            </h3>
            <div className='delete-buttons'>
                <button className='yes' onClick={() => handleDelete()}>Delete Message</button>
                <button className='no' onClick={() => closeModal()}>No</button>
            </div>
        </div>
    )
}

export default DeleteRoomMessageModal;
