import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./../../app/hooks/useAxios";
import { router } from "../../app/layout/Routes";
import EditIcon from "@mui/icons-material/Edit";
import CommonButton from "../../app/common/CommonButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BlogDetail = () => {
  let { id } = useParams<{ id: string }>();
  const { currentBlogHandler, blog } = useAxios();

  useEffect(() => {
    if (id) {
      currentBlogHandler(id);
    }
  }, []);

  return (
    <Box>
      <ArrowBackIcon
        sx={{ cursor: "pointer", m: 4 }}
        onClick={() => router.navigate("/blog")}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          m: 2,
          justifyContent: "flext-start",
          alignItems: "center",
        }}
      >
        <Typography
          textAlign="left"
          padding={2}
          sx={{
            fontWeight: 800,
          }}
        >
          Category: {blog && blog.category}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" padding={2}>
          {blog && blog.title}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          justifyContent: "flext-start",
          alignItems: "center",
        }}
      >
        <Typography paragraph padding={2}>
          {blog && blog.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          m: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CommonButton
          text="Edit"
          onClickHandler={() => router.navigate("/editblogform")}
          endIcon={<EditIcon />}
        />
      </Box>
    </Box>
  );
};

export default BlogDetail;
