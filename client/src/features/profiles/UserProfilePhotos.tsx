import { Box, CircularProgress, Stack } from "@mui/material";
import React, { useState } from "react";
import { Photo, Profile } from "../../app/models/profile";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import useAxios from "../../app/hooks/useAxios";
import UserPhotosCard from "./UserPhotosCard";
import { userPhotoUploadPending } from "../../app/common/options/sliceOpt";
import CommonButton from "../../app/common/CommonButton";

interface ProfileProps {
  userProfile: Profile;
}

const UserProfilePhotos = ({ userProfile }: ProfileProps) => {
  const [loading, setLoading] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);

  const { userPhotoUploadHandler, status, user } =
    useAxios();

  const addPhotoHandler = () => {
    setAddPhoto(!addPhoto);
  };

  const photoUploadHandler = (file: Blob) => {
    console.log("file is:", file);
    userPhotoUploadHandler(file);
    setAddPhoto(!addPhoto);
  };
  return (
    <Box component="div">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <PhotoCameraBackIcon sx={{ fontSize: 24 }} /> Photos:
          {userProfile.photos.length}
        </Stack>
        {userProfile.username === user?.username && (
          <CommonButton
            text={!addPhoto ? "Add Photo" : "Cancel"}
            onClickHandler={addPhotoHandler}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {status === userPhotoUploadPending ? (
          <CircularProgress size="1.4rem" color="secondary" />
        ) : (
          !addPhoto &&
          userProfile.photos.map((p: Photo) => (
            <UserPhotosCard key={p.id} pic={p} />
          ))
        )}
      </Box>
      <Box>
        {addPhoto && (
          <PhotoUploadWidget
            loading={loading}
            photoUploadHandler={photoUploadHandler}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserProfilePhotos;
