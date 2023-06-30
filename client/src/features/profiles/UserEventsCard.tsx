import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { UserActivity } from "../../app/models/profile";
import musicImage from "../../app/assets/images/avtivities.jpg";
import { router } from "../../app/layout/Routes";
import { format } from "date-fns";

interface UserEventsProps {
  activity: UserActivity;
}

const UserEventsCards = ({ activity }: UserEventsProps) => {
  return (
    <Card
      sx={{ width: 180, m: 2, cursor: "pointer" }}
      onClick={() => router.navigate(`/activitydetail/${activity.id}`)}
    >
      <CardMedia sx={{ height: 80 }} image={musicImage} title="User Events" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {activity.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {activity.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Held on:
          {format(new Date(activity.date), "yyyy-MM-dd")}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default UserEventsCards;
