import React, { useState } from 'react';
import { csrfFetch, getCsrfToken } from '../../store/csrf';

function TempFileUpload() {

    const [file, setFile] = useState('')

    const onFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file, file.name);
        formData.append('content_type', 'src');
        formData.append('content_src', 'tempurl');
        const res = await csrfFetch('/api/rooms/1/messages', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const data = await res.json()
            return data
        } else {
            console.log(res.errors)
            return res
        }
    }

    return (
        <div>
            <h1>File Upload Test</h1>
            <div>
                <form onSubmit={onFileUpload}>
                <input type='file' formEncType='multipart/form-data' name='image' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                <button type='submit'>
                    Upload
                </button>
                </form>
            </div>
        </div>
    )
}

export default TempFileUpload;
