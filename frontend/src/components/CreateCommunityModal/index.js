import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newCommunity } from '../../store/community';
import { useModal } from '../../context/Modal';

function CreateCommunityModal() {
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
        return dispatch(newCommunity({
            name,
            description,
            privacy,
            price
        }))
        .then(() => {
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
                Community Name
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Community Description
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Private?
                <input type='checkbox' value={privacy} onChange={(e) => setPrivacy(e.target.value)} />
            </label>
            <label>
                Price
                <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            {errors && <p>{errors.errors}</p>}
            <button type='submit'>Submit</button>
        </form>
        </>
    )
}

export default CreateCommunityModal;
