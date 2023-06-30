import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import React from "react";
import { router } from "../../app/layout/Routes";
import { ActivityAttendee } from "../../app/models/activity";
import { Profile } from "../../app/models/profile";
import UserPng from "../../app/assets/user.png";

interface UserProfileProps {
  userProfile: ActivityAttendee | Profile;
}

const UserProfileCard = ({ userProfile }: UserProfileProps) => {
  return (
    <Card
      sx={{ width: 180, m: "0 auto", cursor: "pointer" }}
      onClick={() => router.navigate(`/userprofile/${userProfile.username}`)}
    >
      <CardMedia
        sx={{ height: 120 }}
        image={userProfile.image || UserPng}
        title="User Events"
      />
      <CardContent>
        <Typography padding={0.5} variant="body2" color="text.secondary">
          Name: {userProfile.displayName}
        </Typography>
        <Typography padding={0.5} variant="body2" color="text.secondary">
          Followers: {userProfile.followersCount}
        </Typography>

        <Typography padding={0.5} variant="body2" color="text.secondary">
          Following: {userProfile.followingCount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
