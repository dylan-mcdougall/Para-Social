import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadRoom, updateRoom } from '../../store/rooms';
import { useModal } from '../../context/Modal/Modal';
import { loadCommunity } from '../../store/community';


function UpdateRoomModal({ setPromptRoomScroll, communityId, room, setRoomMessages }) {
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
        .then(async () => {
            setRoomMessages([]);
            await dispatch(loadRoom(room.id))
            await dispatch(loadCommunity(communityId))
            setPromptRoomScroll(true)
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
                    <p>{errors.name}</p>
                </div>)}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRoomModal;
