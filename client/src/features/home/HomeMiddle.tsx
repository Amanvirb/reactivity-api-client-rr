import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import culture from "../home/categoryImages/culture.jpg";
import drinks from "../home/categoryImages/drinks.jpg";
import film from "../home/categoryImages/film.jpg";
import food from "../home/categoryImages/food.jpg";
import music from "../home/categoryImages/music.jpg";
import travel from "../home/categoryImages/travel.jpg";
import HomeStoryCard from "./HomeStoryCard";

const story = ["Food", "Travel", "Music", "Culture"];

const HomeMiddle = () => {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{ m: 2, backgroundColor: "#f1f1f1"}}
      >
        <Grid item xs={4}>
          <Box className="gallery">
            <img src={culture} alt="Cutural activirties" />
            <img src={drinks} alt="Drinks" />
            <img src={music} alt="a live concert" />
            <img src={travel} alt="Paris" />
            <img src={film} alt="Paris" />
            <img src={food} alt="Paris" />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ width: 600, margin: "0 auto" }}>
            <Typography variant="h3">Lorem ipsum dolor sit,</Typography>
            <Typography variant="h4">consectetur adipiscing elit,</Typography>
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
          m: 2,
          backgroundColor: "#f1f1f1",
          width:"100%"
        }}
      >
        <Typography align="center" variant="h4">
          Lorem ipsum dolor sit amet,
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            m: 2,
            backgroundColor: "#f1f1f1",
            justifyContent:"center"
          }}
        >
          {story.map((s) => (
            <HomeStoryCard title={s} />
          ))}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default HomeMiddle;
