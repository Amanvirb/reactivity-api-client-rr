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
import useAxios from "../../app/hooks/useAxios";
import { commonBtnStyles } from "../../app/common/options/commonBtnStyles";
import { LoadingButton } from "@mui/lab";
import { registerPending } from "../../app/common/options/sliceOpt";

const RegisterForm = () => {
  const { registerNewUserHandler, accountStatus } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      username: "",
    },
  });

  return (
    <Box component={"div"} sx={{ mt: 10 }}>
      <Card sx={{ maxWidth: 450, m: "0 auto" }}>
        <CardContent>
          <Typography align="center" variant="h4" gutterBottom>
            Welcome to Activities!
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit(registerNewUserHandler)}
            className="form-container"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <TextField
                fullWidth
                margin="normal"
                multiline
                label="Display Name"
                autoFocus
                {...register("displayName", {
                  required: "display name is required",
                  minLength: {
                    value: 4,
                    message: "Minimum 4 character are required",
                  },
                })}
                // onBlur={() => setMessage("")}
                error={!!errors.displayName}
                helperText={errors?.displayName?.message}
              />
              <TextField
                fullWidth
                margin="normal"
                multiline
                label="Email"
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
                fullWidth
                margin="normal"
                multiline
                label="Password"
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
              <TextField
                fullWidth
                margin="normal"
                multiline
                label="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 character are required",
                  },
                })}
                // onBlur={() => setMessage("")}
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
              <LoadingButton
                loading={accountStatus === registerPending}
                type="submit"
                sx={commonBtnStyles.btnStyle}
              >
                Register
              </LoadingButton>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterForm;
