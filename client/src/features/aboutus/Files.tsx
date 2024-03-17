import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import agent from '../../app/api/agent';
import { toast } from "react-toastify";
import { Typography } from '@mui/joy';


export default function Files() {

  const [selectedFile, setSelectedFile] = useState<Blob | null>(null);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!selectedFile) {
      return;
    }
    if (selectedFile) {
      setLoading(true);
      let formData = new FormData();
      formData.append("File", selectedFile);
      agent.Activities.uploadFile(formData)
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Problem to upload list");
          console.log(error)
        });

    }
  }
  const handleSubmit = () => {
    if (selectedFile) {
      setLoading(true);
      let formData = new FormData();
      formData.append("File", selectedFile);
      //You can add try catch block  if you want around agent request
      agent.Activities.uploadFileRecieve(formData)
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Result.xlsx');
          document.body.appendChild(link);
          link.click();
          setLoading(false);
          console.log('first response', res);
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Problem to download list");
          console.log(error)
        });

    }
  }
  return (
    <React.Fragment>
      <Box sx={{border:1, p:1, m:1}}>
        <Typography>Upload File Here</Typography>
        <TextField
          type="file"
          margin="normal"
          fullWidth
          autoFocus
          onChange={handleFileChange}
        />
        {loading
          ? <CircularProgress style={{ marginTop: 10 }} color="primary" size="1.6rem" />
          :
          <Button onClick={handleUploadClick}>Upload</Button>}
      </Box>
      <Box sx={{border:1, p:1, m:1}}>
        <Typography>Upload file to get report</Typography>
        <TextField
          type="file"
          margin="normal"
          fullWidth
          autoFocus
          onChange={handleFileChange}
        />
        {loading
          ? <CircularProgress style={{ marginTop: 10 }} color="primary" size="1.6rem" />
          :
          <Button onClick={handleSubmit}>Upload</Button>}
      </Box>
    </React.Fragment>
  );
}