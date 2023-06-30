import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Photo } from "../../app/models/profile";
import useAxios from "../../app/hooks/useAxios";
import CommonButton from "../../app/common/CommonButton";
import { Box } from "@mui/material";
interface UserPhotosProps {
  pic: Photo;
}

const UserPhotosCard = ({ pic }: UserPhotosProps) => {
  const { deleteUserPhototHandler, setMainPhotoHandler, status } = useAxios();

  return (
    <Card sx={{ width: 180, m: 2 }}>
      <CardMedia sx={{ height: 80 }} image={pic.url} title="User Events" />
      <CardContent>
        {!pic.isMain ? (
          <Box component="div">
            <CommonButton
              status={status.includes("setMainPhotoPending" + pic.id)}
              onClickHandler={() => setMainPhotoHandler(pic.id)}
              text="Main"
            />
            <CommonButton
              status={status.includes("deleteUserPhotoPending" + pic.id)}
              onClickHandler={() => deleteUserPhototHandler(pic.id)}
              text="Delete"
            />
          </Box>
        ) : (
          <p>This is main pic</p>
        )}
      </CardContent>
    </Card>
  );
};
export default UserPhotosCard;
