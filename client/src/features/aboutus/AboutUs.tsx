// import { Box } from '@mui/material'
// import React from 'react'

// const AboutUs = () => {
//   return (
//     <Box component="div"  sx={{ m: 6 }}>
//         This page is under Construction
//     </Box>
//   )
// }

// export default AboutUs

import * as React from 'react';
import SvgIcon from '@mui/joy/SvgIcon';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import useAxios from '../../app/hooks/useAxios';
import { useState, ChangeEvent } from 'react';


// const VisuallyHiddenInput = styled('input')`
//   clip: rect(0 0 0 0);
//   clip-path: inset(50%);
//   height: 1px;
//   overflow: hidden;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   white-space: nowrap;
//   width: 1px;
// `;

export default function AboutUs() {

  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const { uploadFileHandler } = useAxios();

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    uploadFileHandler(file)
  }
  return (
    <div>

      <TextField
        type="file"
        margin="normal"
        label="Upload File"
        fullWidth
        autoFocus
        onChange={handleFileChange}
      />

      {/* <input type="file" onChange={handleFileChange} /> */}

      <div>{file && `${file.name} - ${file.type}`}</div>

      <Button onClick={handleUploadClick}>Upload</Button>
    </div>
  );
}