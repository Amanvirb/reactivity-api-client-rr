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
import { useAppDispatch } from "../../app/store/configureStore";
import useEventListner from "../../app/hooks/useEventListner";
import { LoadingButton } from "@mui/lab";
import { commonBtnStyles } from "../../app/common/options/commonBtnStyles";
import { idle, loginPending } from "../../app/common/options/sliceOpt";
import useAxios from "../../app/hooks/useAxios";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { loginHandler } = useEventListner();
  const { accountStatus } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
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
                // onBlur={() => setMessage("")}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
              <TextField
                margin="normal"
                label="Password"
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 character are required",
                  },
                })}
                // onBlur={() => setMessage("")}
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
                  loading={accountStatus === loginPending}
                  type="submit"
                  sx={commonBtnStyles.btnStyle}
                >
                  Login
                </LoadingButton>
                {/* <LoadingButton
                  loading={accountStatus === loginPending}
                  type="submit"
                  sx={commonBtnStyles.btnStyle}
                >
                  Forget Password
                </LoadingButton> */}
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
