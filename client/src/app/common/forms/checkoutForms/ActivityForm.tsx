import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../../components/AppTextInput";
import AppCheckbox from "../../../components/AppCheckbox";
import { Box } from "@mui/material";
import { useEffect } from "react";

const ActivityForm = () => {
  const { control, formState, setValue } = useFormContext();
  // const {control, formState}=useForm();

  // useEffect(() => {
  //     setValue("title", "Food");
  //     setValue("category", "Food");
  //     setValue("city", "Copenhagen");
  //     setValue("venue", "Ishoej");
  //     setValue("country", "Danmark");
  //     setValue("hostName", "Aman");
      
  // }, [setValue]);



  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Activity Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput
            control={control}
            name="title"
            label="Activity Title"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="nutritionFacts"
            label="Nutrition facts"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name="category" label="Category" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="venue" label="Venue" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="country" label="Country" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="hostName" label="Host Name" />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
            disabled={!formState.isDirty}            
            name="isCancelled"
            label="Cancel This activity"
            control={control}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ActivityForm;
