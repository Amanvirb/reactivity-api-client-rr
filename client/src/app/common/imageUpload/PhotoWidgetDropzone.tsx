import { Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
    setFiles: (files: any) => void;
}

export default function PhotoWidgetDropzone({setFiles}: Props) {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        textAlign: 'center' as 'center',
        height: 200
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles} >
            <input {...getInputProps()} />  
            <CloudUploadIcon />
            <Typography variant="subtitle1" color="textSecondary" >Drop image here</Typography>
        </div>
    )
}