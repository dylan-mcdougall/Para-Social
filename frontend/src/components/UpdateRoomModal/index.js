import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadRoom, updateRoom } from '../../store/rooms';
import { useModal } from '../../context/Modal';
import { loadCommunity } from '../../store/community';

function UpdateRoomModal({ setPromptRoomScroll, setClearMessages, communityId, roomId }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(updateRoom({
            communityId,
            roomId,
            name: name
        }))
        .then(() => {
            setClearMessages(true);
            setPromptRoomScroll(true);
            closeModal()
        })
        .catch(
            async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(data.errors);
            }
        )
    }

    return (
        <div className='modal-form'>
            <h3>
                Update Room Name
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

export default UpdateRoomModal;
