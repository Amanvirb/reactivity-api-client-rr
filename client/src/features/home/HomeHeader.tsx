import React from "react";
import { Grid, Typography } from "@mui/material";
import HomeCategoryCard from "./HomeCategoryCard";
import useUtilities from "../../app/hooks/useUtilities";

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

  const {isMobile}= useUtilities();

  return (
    <Grid
      container
      className="header"
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
    >
      <Grid item xs={12} md={6}>
        <Typography variant={isMobile ? "h3" : "h2"}>
          <strong>
            Enjoy Different
            <br /> Activities
          </strong>
        </Typography>
        <Typography variant="body2">Sign in to create an Activity</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            m:2,
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        > */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
        >
          {category.map((cate, index) => (
            <Grid item xs={6} md={4} key={index}>
              <HomeCategoryCard title={cate.title} imgUrl={cate.imgUrl} />
            </Grid>
          ))}
        </Grid>
        {/* </Box> */}
      </Grid>
    </Grid>
  );
};

export default HomeHeader;
