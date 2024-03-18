import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Profile } from "../../app/models/profile";
import UserProfileEditForm from "./forms/UserProfileEditForm";
import CommonButton from "../../app/common/CommonButton";
import useAxios from "../../app/hooks/useAxios";

interface ProfileProps {
  userProfile: Profile;
}

const UserAbout = ({ userProfile }: ProfileProps) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const { user } = useAxios();

  const editButtonHandler = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      {!showEditForm ? (
        <Box component="div">
          <Typography padding={2}>
            Display Name: {userProfile.displayName}
          </Typography>
          <Typography padding={2}>
            Bio: {!userProfile.bio ? "Bio is not available " : userProfile.bio}
          </Typography>
          {userProfile.username === user?.username && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <CommonButton text="Edit" onClickHandler={editButtonHandler} />
            </Box>
          )}
        </Box>
      ) : (
        <UserProfileEditForm editButtonHandler={editButtonHandler} />
      )}
    </Box>
  );
};

export default UserAbout;
