import { ButtonGroup, CircularProgress, Grid, Typography, useTheme, useMediaQuery, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useAxios from '../../hooks/useAxios';

interface Props {
  loading: boolean;
  photoUploadHandler: (file: Blob) => void;
}

export default function PhotoUploadWidget({ loading, photoUploadHandler }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

const {status}=useAxios();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => photoUploadHandler(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview))
    }
  }, [files])


  return (
    <Box component='div' sx={{
      minHeight: '100vh', width:'100%'
    }}>

      <Grid container direction={isMobile ? "column" : "row"} justifyContent="center" alignItems="center">
        <Grid item xs={isMobile ? 12 : 4}>
          <Typography variant="subtitle1" color="textSecondary" >Step 1 - Add Photo</Typography>
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid>
        <Grid item xs={isMobile ? 12 : 4}>
          <Typography variant="subtitle1" color="textSecondary" >Step 2 - Resize image</Typography>
          {files && files.length > 0 && (
            <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
          )}
        </Grid>
        <Grid item xs={isMobile ? 12 : 4}>
          <Typography variant="subtitle1" color="textSecondary" >Step 3 - Preview & Upload</Typography>
          {files && files.length > 0 &&
            <>
              <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
              {loading ? <CircularProgress size='1.4rem' color="secondary" /> :
                <ButtonGroup size='medium'>
                  <>
                    <CheckCircleIcon
                      onClick={onCrop}
                    />
                    <HighlightOffIcon onClick={() => setFiles([])} />
                  </>
                </ButtonGroup>
              }
            </>}
        </Grid>
      </Grid>
      </Box>
  )
}