import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newRoom } from '../../store/rooms';
import { useModal } from '../../context/Modal/Modal';
import { loadCommunity } from '../../store/community';

function CreateRoomModal({ setPromptRoomScroll, setDisplayRoom, webSocket, communityId }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState(null);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (webSocket.current) {
            webSocket.current.close()
        }
        try {
            const newRoomData = await dispatch(newRoom({
                communityId,
                name,
                classification: 'text',
            }))
            setDisplayRoom(newRoomData.id)
            dispatch(loadCommunity(communityId))
            setPromptRoomScroll(true)
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
                {errors && (<div className='errors'>
                    {errors ? <p>{errors.message}</p> : null}
                </div>)}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateRoomModal;
