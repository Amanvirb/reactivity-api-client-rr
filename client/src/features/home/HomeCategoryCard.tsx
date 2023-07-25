import React from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import CabinIcon from '@mui/icons-material/Cabin';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import TheatersIcon from '@mui/icons-material/Theaters';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { Link } from "react-router-dom";

interface CategoryProps {
  title: string;
  imgUrl: string;
}

const HomeCategoryCard = ({ title, imgUrl }: CategoryProps) => {
  return (
    <Card sx={{ width: 150, height: 100, m: 1, p:1, textAlign: "center"}}>
      {/* <CardHeader avatar={<Avatar alt={title} src={imgUrl} />} /> */}
      {/* <CardMedia
        component="img"
        image={imgUrl} 
      /> */}
      {title==="Food" && <FoodBankIcon/>}
      {title==="Culture" && <CabinIcon/>}
      {title==="Music" && <HeadphonesIcon/>}
      {title==="Travel" && <DepartureBoardIcon/>}
      {title==="Films" && <TheatersIcon/>}
      {title==="Drinks" && <LocalBarIcon/>}
      <CardContent>
        <Typography variant="body2">
          <Link to="/" >  {<strong>{title}</strong>}</Link></Typography>
      </CardContent>
    </Card>
  );
};

export default HomeCategoryCard;
