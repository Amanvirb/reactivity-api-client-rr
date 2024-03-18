import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../../components/AppTextInput";
import AppCheckbox from "../../../components/AppCheckbox";
import { Box } from "@mui/material";

const ActivityForm = () => {
  const { control, formState } = useFormContext();

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
          <AppTextInput control={control} name="category" label="Category" value="" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="city" label="City" value="" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="venue" label="Venue" value="" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="country" label="Country" value="" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="hostName" label="Host Name" value="" />
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
