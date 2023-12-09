import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newCommunity } from '../../store/community';
import { useModal } from '../../context/Modal/Modal';
import { removeRoom } from '../../store/rooms';

function CreateCommunityModal({ setDisplayCommunity, setPromptRender }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        dispatch(removeRoom())
        return dispatch(newCommunity({
            name,
            description,
            privacy,
            price
        }))
        .then((data) => {
            setDisplayCommunity(data.id);
            setPromptRender(true);
            closeModal();
        })
        .catch(
            async (response) => {
                const data = await response.json();
                console.log(data.errors)
                if (data && data.errors) setErrors(data.errors);
            }
        )
    }

    return (
        <div className='modal-form'>
        <h3>
            Create A Community
        </h3>
        <form onSubmit={handleSubmit}>
            <label>
                <input type='text' placeholder='Community Name' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <textarea value={description} placeholder="What's your community about?" onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label className='private-radio'>
                Private?
                <input type='checkbox' value={privacy} onChange={(e) => setPrivacy(true)} />
                </label>
                <label className='price-input'>
                    Price:
                    <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                {errors && (<div className='errors'>
                    <p>{errors.name ? <p>Please include a Community Name.</p> : null}</p> <p>{errors.description ? <p>Please include a description.</p> : null}</p>
                </div>)}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateCommunityModal;
