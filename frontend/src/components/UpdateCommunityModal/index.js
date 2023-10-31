import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCommunity, updateCommunity } from '../../store/community';
import { useModal } from '../../context/Modal';

function UpdateCommunityModal({ community, setPromptRender }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(community.name);
    const [description, setDescription] = useState(community.description);
    const [privacy, setPrivacy] = useState(community.private);
    const [price, setPrice] = useState(community.price);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(updateCommunity({
            communityId: community.id,
            name,
            description,
            privacy,
            price
        }))
        .then(() => {
            setPromptRender(true)
            dispatch(loadCommunity(community.id))
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
                Update Community
            </h3>
        <form onSubmit={handleSubmit}>
            <label>
                
                <input type='text' placeholder='Community Name' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                
                <textarea value={description} placeholder='Community Description' onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label className='private-radio'>
                    Private?
                    <input type='checkbox' value={privacy} onChange={(e) => setPrivacy(e.target.value)} />
                </label>
                <label className='price-input'>
                    Price
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

export default UpdateCommunityModal;
