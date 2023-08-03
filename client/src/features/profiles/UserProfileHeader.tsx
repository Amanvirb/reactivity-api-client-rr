import { Box, Grid, Typography } from "@mui/material";
import ImageAvatar from "../../app/components/ImageAvatar";
import { Profile } from "../../app/models/profile";
import useAxios from "../../app/hooks/useAxios";
import { pending } from "../../app/common/options/sliceOpt";
import CommonButton from "../../app/common/CommonButton";
import useUtilities from "../../app/hooks/useUtilities";

interface ProfileProps {
  userProfile: Profile;
}

const avatarStyle1 = {
  width: 50,
  height: 50,
};

const currentUser = localStorage.getItem("currentuser");

const UserProfileHeader = ({ userProfile }: ProfileProps) => {
  const { followBtnHandler, followUnfollowStatus } = useAxios();
  const {isMobile}=useUtilities();

  return (
    <Grid container
    sx={{minHeight:300}}
    direction="row" 
    justifyContent="flex-start"
     alignItems="center">
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            p: 2,
          }}
        >
          <ImageAvatar
            apiUrl={userProfile.image}
            spacing={2}
            avatarStyle={avatarStyle1}
          />
          <Typography textAlign="left" padding={2}>
            {userProfile.username}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems:  "center", p: 1}}>
          <Box sx={{ display: "flex", flexDirection: "row", borderBottom: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography textAlign="center" padding={2}>
                {userProfile.followersCount}
              </Typography>
              <Typography textAlign="center" padding={2}>
                Followers
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography textAlign="center" padding={2}>
                {userProfile.followingCount}
              </Typography>
              <Typography textAlign="center" padding={2}>
                Following
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1,
              minHeight:90
            }}
          >
            {userProfile.username !== currentUser &&
              (followUnfollowStatus === pending ? (
                <p>Loading...</p>
              ) : (
                <CommonButton
                  text={userProfile.following ? "Unfllow" : "follow"}
                  onClickHandler={() => {
                    followBtnHandler(userProfile.username);
                  }}
                />
              ))}
          </Box>
          {/* {followUnfollowStatus === pending && <p>Loading...</p>} */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfileHeader;
