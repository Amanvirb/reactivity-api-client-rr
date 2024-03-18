import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { commonBtnStyles } from "../../../app/common/options/commonBtnStyles";
import AppTextInput from "../../../app/components/AppTextInput";
import { useEffectOnce } from "usehooks-ts";
import useAxios from "../../../app/hooks/useAxios";
import { Blog } from "../../../app/models/blog";
import { v4 as uuidv4 } from "uuid";

const AddBlogForm = () => {
  const { addBlogHandler, loading, blogList } = useAxios();
  const { control, handleSubmit, setValue } = useForm({
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
  };

  return (
    <Box component={"div"} sx={{ m: "80px auto", width: 700 }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography marginBottom={5} variant="h6" gutterBottom>
              Add a new Blog here
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
              value=""
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name="category" label="Category" value=""/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="city" label="City" value=""/>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={!loading}
              variant="contained"
              type="submit"
              size="small"
              sx={commonBtnStyles.btnStyle}
            >
              Add Blog
            </LoadingButton>
          </Grid>
        </Grid>
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

export default AddBlogForm;
