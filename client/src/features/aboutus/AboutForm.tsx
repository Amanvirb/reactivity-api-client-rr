import { Box, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import { commonBtnStyles } from '../../app/common/options/commonBtnStyles';
import { LoadingButton } from '@mui/lab';

const AboutForm = () => {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm({
        mode: "all",
        defaultValues: {
            firtName: "",
            lastName: "",
            attachment: "",
        },
    });

    const loginHandler = () => {

    }

    return (
        <Box component='form'
            // onSubmit={handleSubmit(uploadFileHandler)}
            >
            <TextField
                margin="normal"
                label="First Name"
                fullWidth
                autoFocus
                {...register("firtName", {
                    required: "email is required",
                    minLength: {
                        value: 4,
                        message: "Minimum 4 character are required",
                    },
                })}
                // onBlur={() => setMessage("")}
                error={!!errors.firtName}
            // helperText={errors?.firstName?.message}
            />
            <TextField
                margin="normal"
                label="Email"
                fullWidth
                autoFocus
                {...register("lastName", {
                    // required: "email is required",
                    minLength: {
                        value: 4,
                        message: "Minimum 4 character are required",
                    },
                })}
                // onBlur={() => setMessage("")}
                error={!!errors.lastName}
            // helperText={errors?.email?.message}
            />
            <TextField
                margin="normal"
                label="Attach a file"
                fullWidth
                autoFocus
                {...register("attachment", {
                    // required: "email is required",
                    minLength: {
                        value: 4,
                        message: "Minimum 4 character are required",
                    },
                })}
                // onBlur={() => setMessage("")}
                error={!!errors.attachment}
            // helperText={errors?.email?.message}
            />
            <LoadingButton
                //   loading={accountStatus === loginPending}
                type="submit"
                sx={commonBtnStyles.btnStyle}
            >
                Upload File
            </LoadingButton>
        </Box>
    )
}

export default AboutForm