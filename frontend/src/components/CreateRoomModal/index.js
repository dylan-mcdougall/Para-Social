import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newRoom } from '../../store/rooms';
import { useModal } from '../../context/Modal';
import { loadCommunity } from '../../store/community';

function CreateRoomModal({ webSocket, communityId }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(newRoom({
            communityId,
            name
        }))
        .then(() => {
            if (webSocket.current) {
                webSocket.current.close()
            }
            dispatch(loadCommunity(communityId))
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
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Room Name
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                {errors && <p>{errors.errors}</p>}
                <button type='submit'>Submit</button>
            </form>
        </>)
}

export default CreateRoomModal;
