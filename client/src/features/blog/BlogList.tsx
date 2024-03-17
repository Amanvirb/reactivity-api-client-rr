import { Box } from "@mui/material";
import React from "react";
import CommonButton from "../../app/common/CommonButton";
import { router } from "../../app/layout/Routes";
import useAxios from "../../app/hooks/useAxios";
import { Blog } from "../../app/models/blog";
import BlogListCard from "./BlogListCard";

const BlogList = () => {
  const { blogList } = useAxios();

  return (
    <Box component="div" sx={{ m: 6 }}>
      <CommonButton
        text="Add New Blog"
        onClickHandler={() => router.navigate("/addblogform")}
      />

      {blogList && blogList.map((blog: Blog) => <BlogListCard key={blog.id} blog={blog} />)}
    </Box>
  );
};

export default BlogList;
