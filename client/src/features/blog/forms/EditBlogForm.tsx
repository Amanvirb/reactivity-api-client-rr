import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { id } from "date-fns/locale";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import CommonButton from "../../../app/common/CommonButton";
import { commonBtnStyles } from "../../../app/common/options/commonBtnStyles";
import { editCreateActivityPending } from "../../../app/common/options/sliceOpt";
import AppCheckbox from "../../../app/components/AppCheckbox";
import AppDateInput from "../../../app/components/AppDateInput";
import AppTextInput from "../../../app/components/AppTextInput";
import { router } from "../../../app/layout/Routes";
import { useEffectOnce } from "usehooks-ts";
import useAxios from "../../../app/hooks/useAxios";
import { Blog } from "../../../app/models/blog";
import { v4 as uuidv4 } from "uuid";

const EditBlogForm = () => {
  const { addBlogHandler, loading, blogList } = useAxios();
  const { control, formState, handleSubmit, setValue, reset } = useForm({
    mode: "all",
  });

  useEffectOnce(() => {
    setValue("id", uuidv4());
    setValue("postedDate", "");
    setValue("title", "");
    setValue("category", "");
    setValue("description", "");
    setValue("isPublish", "");
  });

  const submitHandler = (data: FieldValues) => {
    addBlogHandler(data);
    console.log(data);
    // reset();
  };

  return (
    <Box component={"div"} sx={{ m: "80px auto", width: 700 }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack direction="column" alignItems="flex-start" spacing={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography marginBottom={5} variant="h6" gutterBottom>
                Make changes in your Blog here
              </Typography>
              <AppTextInput
                // value={activityDetail?.title}
                control={control}
                name="title"
                label="Title"
              />
            </Grid>
            <Grid item xs={12}>
              <AppTextInput
                // value={activityDetail?.description}
                control={control}
                name="description"
                label="Description"
                multiline={true}
                rows={10}
              />
            </Grid>
            <Grid item xs={12}>
              <AppTextInput
                // value={activityDetail?.category}
                control={control}
                name="category"
                label="Category"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                // value={activityDetail?.city}
                control={control}
                name="city"
                label="City"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <AppCheckbox
                chekedValue={false}
                name="isPublish"
                label="Publish belog"
                control={control}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <AppDateInput name="date" label="Date" control={control} />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={2}>
            <LoadingButton
              loading={!loading}
              variant="contained"
              type="submit"
              size="small"
              sx={commonBtnStyles.btnStyle}
            >
              Update Blog
            </LoadingButton>
            {/* <CommonButton
              text="Add"
              onClickHandler={() =>
                router.navigate(id ? `/activitydetail/${id}` : "/activities")
              }
            /> */}
          </Stack>
        </Stack>
      </form>
      {blogList &&
        blogList.map((blog: Blog) => (
          <Box key={blog.id}>
            {blog.title}
            {blog.category}
            {blog.description}
          </Box>
        ))}
    </Box>
  );
};

export default EditBlogForm;
