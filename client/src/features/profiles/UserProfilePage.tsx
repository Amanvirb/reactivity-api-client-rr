import React, { useEffect } from "react";
import { Box, Container, Grid, Paper, styled } from "@mui/material";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileContainer from "./UserProfileContainer";
import useAxios from "../../app/hooks/useAxios";
import { useParams } from "react-router-dom";
import { idle } from "./../../app/common/options/sliceOpt";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: 1,
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>();

  const { getUserProfile, profile, userProfilestatus } = useAxios();

  useEffect(() => {
    if (username && profile?.username !== username) {
      getUserProfile(username);
    }
  }, [getUserProfile, profile?.username, username]);

  return (
    <Box component={"div"} sx={{ mt: 10 }}>
      <Container maxWidth={"lg"}>
        {profile && userProfilestatus === idle ? (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Item>
                <UserProfileHeader userProfile={profile} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              <Item>
                <UserProfileContainer userProfile={profile} />
              </Item>
            </Grid>
          </Grid>
        ) : (
          <p>Loading..</p>
        )}
      </Container>
    </Box>
  );
};

export default UserProfilePage;
