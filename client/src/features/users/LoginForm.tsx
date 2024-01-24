import React from "react";
import { FieldValues, useForm } from "react-hook-form";
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
import agent from "../../app/api/agent";
import { router } from "../../app/layout/Routes";

const LoginForm = () => {

  const { accountStatus } = useAxios();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginHandler = async (values: FieldValues) => {
    try {
      const response = await agent.Account.login(values);
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentuser", response.username);
      console.log("response is::::", response);
      router.navigate("/activities");
      return response;
    } catch (error: any) {
      if (error.response.data === "Invalid email") {
        setError('email', { message: "Invalid email" });
      }
      if (error.response.data === "Invalid password") {
        setError('password', { message: "Invalid password" });
      }

      return ({ error: error.data });
    }

  }

  return (
    <Box component={"div"} sx={{ mt: 10 }}>
      <Card sx={{ maxWidth: 450, m: "0 auto" }}>
        <CardContent>
          <Typography align="center" variant="h4" gutterBottom>
            Hi Again
          </Typography>
          <Box
            component={"form"}
            // onSubmit={handleSubmit(loginHandler)}
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
                  disabled={!isValid}
                  onClick={handleSubmit(loginHandler)}
                  loading={accountStatus === loginPending}
                  type="submit"
                  sx={commonBtnStyles.btnStyle}
                >
                  Login
                </LoadingButton>
                {/* <LoadingButton
                  onClick={handleSubmit(forgetPswHandler)}
                  loading={accountStatus === loginPending}
                  type="submit"
                  sx={commonBtnStyles.btnStyle}
                >
                  Forget Password
                </LoadingButton> */}
              </Box>
            </Stack>
          </Box>
          {/* <Box
            component={"form"}
            // onSubmit={handleSubmit(loginHandler)}
            className="form-container"
          >
            <LoadingButton
              onClick={handleSubmit(loginHandler1)}
              loading={accountStatus === loginPending}
              type="submit"
              sx={commonBtnStyles.btnStyle}
            >
              Forget Password
            </LoadingButton>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
