import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../../components/AppTextInput";
import { useEffect } from "react";

const protien = "Protien";

const SubActivityForm = () => {
  const { control, setValue, watch } = useFormContext();
  // const {control, setValue, watch}=useForm();
  const testValue = watch(["nutritionFacts", "protienSource"]);

  useEffect(() => {
    if (testValue.length > 0) {
      setValue(
        "protienSource",
        testValue[0] === protien ? "Eggs" : "Other Source"
      );
      setValue(
        "source1",
        testValue[0] === protien
          ? "Protien source 1" + " , " + testValue[1]
          : "other1" + " , " + testValue[1]
      );
      setValue(
        "source2",
        testValue[0] === protien
          ? "Protien source 2" + " , " + testValue[1]
          : "other2" + " , " + testValue[1]
      );
      setValue(
        "source3",
        testValue[0] === protien
          ? "Protien source 3" + " , " + testValue[1]
          : "other3" + " , " + testValue[1]
      );
      setValue(
        "source4",
        testValue[0] === protien
          ? "Protien source 4" + " , " + testValue[1]
          : "other4" + " , " + testValue[1]
      );
    }
  }, [testValue[0], testValue[1]]);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sub Activity::
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
          <AppTextInput
            disablevalue={true.toString()}
            control={control}
            name="protienSource"
            label="Source of Protien"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            disablevalue={true.toString()}
            control={control}
            name="source1"
            label="Source 1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            disablevalue={true.toString()}
            control={control}
            name="source2"
            label="Source 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            disablevalue={
              testValue[0] === protien ? true.toString() : false.toString()
            }
            control={control}
            name="source3"
            label="Source 3"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            disablevalue={
              testValue[0] === protien ? true.toString() : false.toString()
            }
            control={control}
            name="source4"
            label="Source 4"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default SubActivityForm;
