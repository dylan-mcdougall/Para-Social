import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newRoom } from '../../store/rooms';
import { useModal } from '../../context/Modal';
import { loadCommunity } from '../../store/community';

function CreateRoomModal({ setPromptRoomScroll, setDisplayRoom, webSocket, communityId }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const newRoomData = await dispatch(newRoom({
                communityId,
                name
            }))
            if (webSocket.current) {
                webSocket.current.close()
            }
            setDisplayRoom(newRoomData.id)
            setPromptRoomScroll(true)
            dispatch(loadCommunity(communityId))
            closeModal()
        } catch (error) {
            console.log('Error creating room: ', error)
            setErrors(error)
        }
    }

    return (
        <div className='modal-form'>
            <h3>
                Create A Room
            </h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type='text' placeholder='Room Name' value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                {errors && <p>{errors.errors}</p>}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateRoomModal;
