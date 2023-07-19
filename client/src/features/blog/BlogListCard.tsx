import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Stack,
  CardActions,
  Tooltip,
} from "@mui/material";
import React from "react";
import { router, routes } from "../../app/layout/Routes";
import { ActivityAttendee } from "../../app/models/activity";
import { Profile } from "../../app/models/profile";
import UserPng from "../../app/assets/user.png";
import { Blog } from "../../app/models/blog";
import CommonButton from "../../app/common/CommonButton";
import DeleteIcon from "@mui/icons-material/Delete";
import useAxios from "../../app/hooks/useAxios";

interface BlogListProps {
  blog: Blog;
}

const BlogListCard = ({ blog }: BlogListProps) => {
  const { deleteBlogHandler } = useAxios();
  return (
    <Card
      sx={{ m: "20px auto", cursor: "pointer" }}
      // onClick={() => router.navigate(`/blog/${blog.username}`)}
    >
      {/* <CardMedia
        sx={{ height: 120 }}
        image={blog.image || UserPng}
        title="User Events"
      /> */}
      {/* <CardActions>
        
      </CardActions> */}
      <CardContent>
        <Typography padding={0.5} variant="body2" color="text.secondary">
          Title: {blog.title}
        </Typography>
        <Typography padding={0.5} variant="body2" color="text.secondary">
          Category: {blog.category}
        </Typography>
        <Typography padding={0.5} variant="body2" color="text.secondary">
          Description: {blog.description}
        </Typography>
        {/* <Typography padding={0.5} variant="body2" color="text.secondary">
          Posted Date: {blog.date}
        </Typography> */}
        <Typography padding={0.5} variant="body2" color="text.secondary">
          Published: {blog.isPublish}
        </Typography>
      </CardContent>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        // spacing={{ xs: 1, sm: 2, md: 4 }}
        padding={2}
      >
       
        <CommonButton onClickHandler={()=>router.navigate(`/blogdetail/${blog.id}`)} text="View" />
        <Tooltip title="Delete Blog" onClick={() => deleteBlogHandler(blog.id)}>
          <DeleteIcon sx={{ color: "#21b6af" }} />
        </Tooltip>
      </Stack>
    </Card>
  );
};

export default BlogListCard;
