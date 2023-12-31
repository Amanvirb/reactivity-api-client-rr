import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import CabinIcon from "@mui/icons-material/Cabin";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import TheatersIcon from "@mui/icons-material/Theaters";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { Link } from "react-router-dom";
import useUtilities from "../../app/hooks/useUtilities";

interface CategoryProps {
  title: string;
}

const HomeStoryCard = ({ title }: CategoryProps) => {

  const { isMobile } = useUtilities();

  return (
    <Card
      sx={{
        width: isMobile ? 150 : 250,
        height: isMobile? 100 : 200,
        m: '1px auto',
        p: 1,
        textAlign: "center",
        ":hover": {
          boxShadow: 20, 
        },
      }}
    >
      {title === "Food" && <FoodBankIcon />}
      {title === "Culture" && <CabinIcon />}
      {title === "Music" && <HeadphonesIcon />}
      {title === "Travel" && <DepartureBoardIcon />}
      <CardContent>
        <Typography variant="body1">consectetur</Typography>
        <Typography variant="body2">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HomeStoryCard;
