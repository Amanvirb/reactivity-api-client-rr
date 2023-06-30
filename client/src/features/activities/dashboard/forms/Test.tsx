import React from 'react'
import {FieldValues, useForm } from 'react-hook-form';
import AppSelectList from '../../../../app/components/AppSelectList';
import { Box, Button } from '@mui/material';

const brands=["AAA", "BBB", "CCCC"]

const Test = () => {
    const { control, reset, handleSubmit, watch, formState: {isDirty, isSubmitting} } = useForm({
        mode: 'all',
       
    });

    const handleSubmitData=(data: FieldValues)=>{
        console.log("testing", data);
    }

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(handleSubmitData)}
      className="form-container"
      sx={{ m: 10 }}
    >
        {/* <AppSelectList items={brands} control={control} name='brand' label='Brand' /> */}
        
        <Button type="submit">Submit</Button>
    </Box>
  )
}

export default Test