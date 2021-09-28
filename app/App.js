import React, { useState } from 'react'
import FileUpload from './components/FileUpload';

const App = () => {
    const [newUserInfo, setNewUserInfo] = useState({
        profileImages: []
    });

    const updateUploadedFiles = (files) =>
        setNewUserInfo({ ...newUserInfo, profileImages: files });
    return (
        <>
            <FileUpload
                accept=".mp4,.mkv,.avi,.avchd,.wmv,.png,.jpg,.jpeg,.pdf,.docx,.gif"
                label="files"
                multiple
                updateFilesCb={updateUploadedFiles} />
        </>
    )
}

export default App
