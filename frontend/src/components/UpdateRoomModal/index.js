import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateRoom } from '../../store/rooms';
import { useModal } from '../../context/Modal';


function UpdateRoomModal({ setPromptRoomScroll, setClearMessages, communityId, room }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(room.name);
    const [errors, setErrors] = useState(null);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(updateRoom({
            communityId,
            roomId: room.id,
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
                {errors && (<div className='errors'>
                    <p>Room name must exist and be unique.</p>
                </div>)}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRoomModal;
