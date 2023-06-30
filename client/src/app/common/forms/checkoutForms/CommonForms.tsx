import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import ActivityForm from "./ActivityForm";
import SubActivityForm from "./SubActivityForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./activityValidation";
import { useAppDispatch } from "../../../store/configureStore";
import { setFormActivity } from "../../../../features/activities/activitySlice";
import useAxios from "../../../hooks/useAxios";

const steps = ["Activity Detail", "Sub-activity", "Review"];

const CommonForms = () => {
  const [activeStep, setActiveStep] = useState(0);

  const dispatch = useAppDispatch();
  const { formActivityStateStatus } = useAxios();

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
  });

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <ActivityForm />;
      case 1:
        return <SubActivityForm />;
      case 2:
        return "reviewDetails";
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = (data: FieldValues) => {
    console.log(JSON.stringify(data, null, 2));
    if (activeStep === steps.length - 1) {
      console.log("If Code values are:", data);
      dispatch(setFormActivity(data));
      console.log("statusss i s", formActivityStateStatus);
      if (formActivityStateStatus) {
        methods.reset();
        setActiveStep(0);
      }
    } else {
      console.log("else block", activeStep);
      setActiveStep(activeStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // function submitDisabled(): boolean {
  //     if (activeStep === steps.length - 1) {
  //         return !cardComplete.cardCvc
  //             || !cardComplete.cardExpiry
  //             || !cardComplete.cardNumber
  //             || !methods.formState.isValid
  //     } else {
  //         return !methods.formState.isValid
  //     }
  // }
  return (
    <FormProvider {...methods}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Message
              </Typography>
            </>
          ) : (
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <LoadingButton
                  // loading={loading}
                  // disabled={submitDisabled()}
                  disabled={!methods.formState.isValid}
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </LoadingButton>
              </Box>
            </form>
          )}
        </>
      </Paper>
    </FormProvider>
  );
};

export default CommonForms;
