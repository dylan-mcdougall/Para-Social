import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCommunity } from '../../store/community';
import { useModal } from '../../context/Modal';
import { loadCommunity } from '../../store/community';

function UpdateCommunityModal({ community }) {
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
            loadCommunity(community.id)
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
            {errors && <p>{errors.errors}</p>}
            <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default UpdateCommunityModal;
