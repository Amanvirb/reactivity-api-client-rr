import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import useAxios from "../../../../app/hooks/useAxios";
import { useParams } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import AppCheckbox from "../../../../app/components/AppCheckbox";
import AppTextInput from "../../../../app/components/AppTextInput";
import CommonButton from "../../../../app/common/CommonButton";
import { LoadingButton } from "@mui/lab";
import { editCreateActivityPending } from "../../../../app/common/options/sliceOpt";
import { commonBtnStyles } from "../../../../app/common/options/commonBtnStyles";
import { router } from "../../../../app/layout/Routes";
import AppDateInput from "../../../../app/components/AppDateInput";
import { parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import useDispatchReducer from "../../../../app/hooks/useDispatchReducer";
import { useEffectOnce } from "usehooks-ts";

registerLocale("es", es);

const ActivityEditCreateForm = () => {
  let { id } = useParams<{ id: string }>();

  const {
    activityStatus,
    activityDetail,
    updateActivityHandler,
    createActivityHandler,
    getActivityDetail,
  } = useAxios();

  const { clearActivityDetailHandler } = useDispatchReducer();

  const { control, handleSubmit, setValue } = useForm({
    mode: "all",
  });

  useEffectOnce(() => {
    if (id && activityDetail?.id !== id) {
      getActivityDetail(id);
    }
  });

  useEffectOnce(() => {
    if (id && activityDetail && activityDetail?.id === id) {
      setValue("id", activityDetail.id);
      setValue("title", activityDetail.title);
      setValue("date", parseISO(activityDetail.date.toString()));
      setValue("description", activityDetail.description);
      setValue("category", activityDetail.category);
      setValue("city", activityDetail.city);
      setValue("venue", activityDetail.venue);
    }

    if (id === undefined) {
      setValue("id", uuidv4());
      setValue("date", new Date());
      setValue("title", "");
      setValue("description", "");
      setValue("category", "");
      setValue("city", "");
      setValue("venue", "");
      clearActivityDetailHandler();
    }
  });

  const submitHandler = (data: FieldValues) => {
    const newData = { ...data, date: new Date(data.date).toISOString() };
    if (id) {
      updateActivityHandler(newData);
    } else {
      console.log("createactivity", newData);
      createActivityHandler(newData);
    }
  };

  return (
    <Box component={"div"} sx={{ m: "80px auto", width: 700 }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack direction="column" alignItems="flex-start" spacing={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography marginBottom={5} variant="h6" gutterBottom>
                {id ? "Edit Activity" : "Create Activity"}
              </Typography>
              <AppTextInput
                value={activityDetail?.title}
                control={control}
                name="title"
                label="Title"
              />
            </Grid>
            <Grid item xs={12}>
              <AppTextInput
                value={activityDetail?.description}
                control={control}
                name="description"
                label="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <AppTextInput
                value={activityDetail?.category}
                control={control}
                name="category"
                label="Category"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                value={activityDetail?.city}
                control={control}
                name="city"
                label="City"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                value={activityDetail?.venue}
                control={control}
                name="venue"
                label="venue"
              />
            </Grid>
            {id && (
              <Grid item xs={12}>
                <AppCheckbox
                  chekedValue={
                    activityDetail ? activityDetail.isCancelled : false
                  }
                  name="isCancelled"
                  label="Cancel this activity"
                  control={control}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <AppDateInput name="date" label="Date" control={control} />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2}>
            <LoadingButton
              loading={activityStatus.includes(editCreateActivityPending)}
              variant="contained"
              type="submit"
              size="small"
              sx={commonBtnStyles.btnStyle}
            >
              {id ? "Update" : "Create"}
            </LoadingButton>
            <Button
              onClick={() =>
                router.navigate(id ? `/activitydetail/${id}` : "/activities")
              }
              sx={commonBtnStyles.btnStyle}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
export default ActivityEditCreateForm;
