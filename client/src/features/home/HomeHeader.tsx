import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import HomeCategoryCard from "./HomeCategoryCard";

interface Category {
  title: string;
  imgUrl: string;
}

const category = [
  { title: "Food", imgUrl: "/" },
  { title: "Culture", imgUrl: "/" },
  { title: "Music", imgUrl: "/" },
  { title: "Travel", imgUrl: "/" },
  { title: "Films", imgUrl: "/" },
  { title: "Drinks", imgUrl: "/" },
];

const HomeHeader = () => {
  return (
    <Grid
      container
      spacing={2}
      className="header"
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid item xs={6}>
        <Typography color={"#013220"} variant="h2">
          <strong>
            Enjoy Different
            <br /> Activities
          </strong>
        </Typography>
        <Typography variant="body2" color={"#013220"}>
            Sign to create an Activity
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            m:2,
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {category.map((cate) => (
            <HomeCategoryCard title={cate.title} imgUrl={cate.imgUrl} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomeHeader;
