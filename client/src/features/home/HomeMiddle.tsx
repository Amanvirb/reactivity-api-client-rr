import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import culture from "../home/categoryImages/culture.jpg";
import drinks from "../home/categoryImages/drinks.jpg";
import film from "../home/categoryImages/film.jpg";
import food from "../home/categoryImages/food.jpg";
import music from "../home/categoryImages/music.jpg";
import travel from "../home/categoryImages/travel.jpg";
import HomeStoryCard from "./HomeStoryCard";
import useUtilities from "../../app/hooks/useUtilities";

const story = ["Food", "Travel", "Music", "Culture"];

const HomeMiddle = () => {
  const { isMobile } = useUtilities();

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ p: '100px 0',  my: .2, backgroundColor: "#f1f1f1" }}
      >
        <Grid item xs={12} md={4}>
          <Box className="gallery">
            <img src={culture} alt="Cutural activirties" />
            <img src={drinks} alt="Drinks" />
            <img src={music} alt="a live concert" />
            <img src={travel} alt="Paris" />
            <img src={film} alt="Paris" />
            <img src={food} alt="Paris" />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ width: isMobile ? 300 : 600, margin: "0 auto" }}>
            <Typography variant={isMobile ? "h4" : "h3"}>
              Lorem ipsum dolor sit,
            </Typography>
            <Typography variant={isMobile ? "h5" : "h4"}>
              consectetur adipiscing elit,
            </Typography>
            <Typography variant="body2">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillumsed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          my: .2,
          p: '100px 0',
          backgroundColor: "#f1f1f1",
          width: "100%",
        }}
      >
        <Typography align="center" variant="h4">
          Lorem ipsum dolor sit amet,
        </Typography>
        <Grid container direction="row" justifyContent="center" p={2}  rowSpacing={2}>
          {story.map((s, index) => (
            <Grid item xs={12} md={3} key={index}>
              <HomeStoryCard title={s} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default HomeMiddle;
