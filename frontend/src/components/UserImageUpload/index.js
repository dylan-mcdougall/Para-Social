import React, { useState, useRef } from 'react';
import { csrfFetch } from '../../store/csrf';
import { useModal } from '../../context/Modal/Modal';
import { FaUser } from "react-icons/fa6";
import './UserImageUpload.css';

function UserImageUpload({ setPromptRender, user }) {
    const { closeModal } = useModal();
    const [imageSrc, setImageSrc] = useState(user?.ProfileImage ? user?.ProfileImage?.url : null);
    const [imageName, setImageName] = useState(user?.ProfileImage ? user?.ProfileImage?.name : null)
    const imageRef = useRef(null);

    console.log("Image Source HERE!: ", imageSrc)

    const onFileUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('image', file, file.name);
        const response = await csrfFetch(`api/users/${user.id}/image-preview`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        setImageSrc(data.url);
        setImageName(data.name);
    };
    
    const handleSubmit = async () => {
        const reqBody = {
            url: imageSrc,
            name: imageName
        }
        const response = await csrfFetch(`/api/users/${user.id}/images`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
        });
        const data = await response.json();
        if (data && !data.errors) {
            closeModal();
            setImageName(null);
            setImageSrc(null);
        } else {
            throw new Error("There was an error committing your image to the database.")
        }
    };


    return (
        <div className='image-modal'>
            {imageSrc ? (<img className='image-preview' src={imageSrc} alt='Thumbnail' />)
            : <FaUser className="image-preview" style={{backgroundColor : "#00ccff", color : "black"}} />}
            <form className='image-upload' onSubmit={handleSubmit}>
                <label htmlFor='image'>
                    Upload a Profile Image
                </label>
                <input type='file' ref={imageRef} formEncType='multipart/form-data' name='image' accept='image/*' onChange={(e) => onFileUpload(e)} />
                <button type='submit' className='image-submit'>Confirm Image</button>
            </form>
        </div>
    )
}

export default UserImageUpload;
