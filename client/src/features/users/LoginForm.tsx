import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useEventListner from "../../app/hooks/useEventListner";
import { LoadingButton } from "@mui/lab";
import { commonBtnStyles } from "../../app/common/options/commonBtnStyles";
import { loginPending } from "../../app/common/options/sliceOpt";
import useAxios from "../../app/hooks/useAxios";
import agent from "../../app/api/agent";
import { signInUser } from "./account/accountSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import { router } from "../../app/layout/Routes";
import { AxiosResponse } from 'axios';

interface FormValidity {
  email: string;
  password: string;
  isEmailInValid: boolean;
  isPasswordInValid: boolean;
}

const LoginForm = () => {
  // const { loginHandler } = useEventListner();
  const [formValidity, setFormValidity] = useState<FormValidity>({
    email: "",
    password: "",
    isEmailInValid: false,
    isPasswordInValid: false,
  });
  const [isEmailPasswordValid, setIsEmailPasswordValid] = useState(false);

  const { accountStatus } = useAxios();
  const dispatch = useAppDispatch();

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

  const loginHandler = async (values: FieldValues) => {
    try {
      const response = await agent.Account.login(values);
      localStorage.setItem("token", response.token);
      localStorage.setItem("currentuser", response.username);
      console.log("response is::::", response);
      router.navigate("/activities");
      return response;
    } catch (error: any) {
      // if (error.response.data === "Invalid email") {
      //   if (errors.email) errors.email.message = "Invalid Email";
      // }
      // if (error.response.data === "Invalid password")
      //   if (errors.password) errors.password.message = "Invalid Password";

      if (error.response.data === "Invalid email") {

        setFormValidity({
          email: "Invalid Email",
          password: "",
          isEmailInValid: true,
          isPasswordInValid: false
        });
      }
      if (error.response.data === "Invalid password")
        setFormValidity({
          email: "",
          password: "Invalid Password",
          isEmailInValid: false,
          isPasswordInValid: true
        });
      // router.navigate("/loginform");
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
              {formValidity.isEmailInValid && formValidity.email}
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
              {formValidity.isPasswordInValid && formValidity.password}
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
                  // onClick={handleSubmit(async (values: FieldValues) => {
                  //   try {
                  //     const response = await agent.Account.login(values);
                  //     localStorage.setItem("token", response.token);
                  //     localStorage.setItem("currentuser", response.username);
                  //     console.log("response is::::", response);
                  //     router.navigate("/activities");
                  //     return response;
                  //   } catch (error: any) {
                  //     console.log("errorr data is::", JSON.stringify(error.response.data));
                  //     if (error.response.data === "Invalid email") {
                  //       if (errors.email) errors.email.message = "Invalid Email";
                  //     }
                  //     if (error.response.data === "Invalid password")
                  //       if (errors.password) errors.password.message = "Invalid Password";
                  //     // router.navigate("/loginform");
                  //     return ({ error: error.data });
                  //   }

                  // })}
                  loading={accountStatus === loginPending}
                  type="submit"
                  sx={commonBtnStyles.btnStyle}
                >
                  Login
                </LoadingButton>
                {/* <LoadingButton
                  onClick={handleSubmit(loginHandler1)}
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
