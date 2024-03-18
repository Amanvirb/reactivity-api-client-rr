import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { commonBtnStyles } from "../../app/common/options/commonBtnStyles";
import { loginPending } from "../../app/common/options/sliceOpt";
import useAxios from "../../app/hooks/useAxios";

const LoginForm = () => {
  const { accountStatus, loginHandler } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Box component={"div"} sx={{ mt: 10 }}>
      <Card sx={{ maxWidth: 450, m: "0 auto" }}>
        <CardContent>
          <Typography align="center" variant="h4" gutterBottom>
            Hi Again
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit(loginHandler)}
            className="form-container"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <TextField
                margin="normal"
                label="Email"
                fullWidth
                autoFocus
                {...register("email", {
                  required: "email is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 character are required",
                  },
                })}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <TextField
                margin="normal"
                type="password"
                label="Password"
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 character are required",
                  },
                })}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <LoadingButton
                  disabled={!isValid}
                  onClick={handleSubmit(loginHandler)}
                  loading={accountStatus === loginPending}
                  type="submit"
                  sx={commonBtnStyles.btnStyle}
                >
                  Login
                </LoadingButton>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
