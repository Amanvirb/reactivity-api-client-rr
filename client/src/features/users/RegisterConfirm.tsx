import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useAxios from '../../app/hooks/useAxios'
import { VerifyEmail } from '../../app/models/account';
import useQuery from '../../app/hooks/hooks';

const RegisterConfirm = () => {

const email=useQuery().get('email') as string;
const token=useQuery().get('token') as string;

    const {verifyEmailHandler}= useAxios();

    const data: VerifyEmail={
        email:email,
        token:token,
    }

    useEffect(() => {
    verifyEmailHandler(data);  
    }, [])
    

  return (
    <Box>
       <Typography>Your account has registered Succefully</Typography> 
    </Box>
  )
}

export default RegisterConfirm