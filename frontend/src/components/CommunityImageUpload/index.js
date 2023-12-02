import React, { useState, useRef } from 'react';
import { csrfFetch } from '../../store/csrf';
import { useModal } from '../../context/Modal/Modal';
import { FaPeopleGroup } from "react-icons/fa6";
import './CommunityImageUpload.css';

function CommunityImageUpload({ setPromptRender, community }) {
    const { closeModal } = useModal();
    const [imageSrc, setImageSrc] = useState(community?.CommunityImage ? community?.CommunityImage?.url : null);
    const [imageName, setImageName] = useState(community?.CommunityImage ? community?.CommunityImage?.name : null)
    const imageRef = useRef(null);

    console.log("Image Source HERE!: ", imageSrc)

    const onFileUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('image', file, file.name);
        const response = await csrfFetch(`api/communities/${community.id}/image-preview`, {
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
        const response = await csrfFetch(`/api/communities/${community.id}/images`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
        });
        const data = await response.json();
        if (data && !data.errors) {
            closeModal();
            setImageName(null);
            setImageSrc(null);
            setPromptRender(true)
        } else {
            throw new Error("There was an error committing your image to the database.")
        }
    };


    return (
        <div className='image-modal'>
            {imageSrc ? (<img className='image-preview' src={imageSrc} alt='Thumbnail' />)
            : <FaPeopleGroup style={{ backgroundColor: "lightblue", color: "black" }} className='image-preview' />}
            <form className='image-upload' onSubmit={handleSubmit}>
                <label htmlFor='image'>
                    Upload a Community Image
                </label>
                <input type='file' ref={imageRef} formEncType='multipart/form-data' name='image' accept='image/*' onChange={(e) => onFileUpload(e)} />
                <button type='submit' className='image-submit'>Confirm Image</button>
            </form>
        </div>
    )
}

export default CommunityImageUpload;
