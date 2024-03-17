import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { commonBtnStyles } from "../../../app/common/options/commonBtnStyles";
import AppTextInput from "../../../app/components/AppTextInput";
import { useEffectOnce } from "usehooks-ts";
import useAxios from "../../../app/hooks/useAxios";

const EditBlogForm = () => {
  const { updateBlogHandler, loading, blog } = useAxios();
  const { control, handleSubmit, setValue } = useForm({
    mode: "all",
  });

  useEffectOnce(() => {
    if (blog) {
      setValue("id", blog.id);
      setValue("title", blog.title);
      setValue("category", blog.category);
      setValue("description", blog.description);
      setValue("isPublish", blog.isPublish);
    }
  });

  const submitHandler = (data: FieldValues) => {
    updateBlogHandler(data);
  };

  return (
    <Box component={"div"} sx={{ m: "80px auto", width: 700 }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography marginBottom={5} variant="h6" gutterBottom>
              Make changes in your Blog here
            </Typography>
            <AppTextInput control={control} name="title" label="Title" />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              control={control}
              name="description"
              label="Description"
              multiline={true}
              rows={10}
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name="category" label="Category" />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={!loading}
              variant="contained"
              type="submit"
              size="small"
              sx={commonBtnStyles.btnStyle}
            >
              Update Blog
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditBlogForm;
