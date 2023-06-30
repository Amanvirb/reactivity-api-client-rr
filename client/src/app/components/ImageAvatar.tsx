import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import UserPng from "../../app/assets/user.png";
import { Box } from "@mui/material";
interface Props {
  apiUrl: string | null;
  spacing: number;
  avatarStyle: any;
}

const ImageAvatar = ({ apiUrl, spacing, avatarStyle }: Props) => {
  return <Avatar src={apiUrl || UserPng} sx={avatarStyle} alt="profile pic" />;
};
export default ImageAvatar;
