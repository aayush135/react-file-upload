import React, { useRef, useState } from "react";


const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;

const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
    label,
    updateFilesCb,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps
}) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
        }
        return { ...files };
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    const handleNewFileUpload = (e) => {
        const { files: newFiles } = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({ ...files });
        callUpdateFilesCb({ ...files });
    };

    return (
        <>
            <section className='FileUploadContainer'>
                <p className='DragDropText'>Drag and drop your {label} or</p>
                <button className='UploadFileBtn' type="button" onClick={handleUploadBtnClick}>
                    <i className="fa fa-upload" />
                    <span> Upload {label}</span>
                </button>
                <input className='FormField'
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                />
            </section>
            <article className='FilePreviewContainer'>
                {/* <span>To Upload</span> */}
                <section className='PreviewList'>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <section className='PreviewContainer' key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <img className='ImagePreview'
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <div className='FileMetaData' >
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <i
                                                className="fa fa-trash RemoveFileIcon"
                                                onClick={() => removeFile(fileName)}
                                            />
                                        </aside>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </section>
            </article>
        </>
    );
};

export default FileUpload;
