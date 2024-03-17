import React from "react";
import { Box, Typography } from "@mui/material";
import ImageAvatar from "../../../app/components/ImageAvatar";
import { ActivityAttendee, ActivityDetail } from "../../../app/models/activity";
import useDispatchReducer from "../../../app/hooks/useDispatchReducer";
import { idle } from "../../../app/common/options/sliceOpt";
import { Link } from "react-router-dom";
import useUtilities from "../../../app/hooks/useUtilities";
interface ActivityProps {
  activity: ActivityDetail | null;
}

const avatarStyle1 = {
  width: 50,
  height: 50,
};

const ActivityDetailRightPane = ({ activity }: ActivityProps) => {
  const { activityStatus } = useDispatchReducer();
  const { appFontSize, isMobile } = useUtilities();
  return (
    <Box>
      {activityStatus === idle && activity ? (
        <>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            textAlign="center"
            sx={{ backgroundColor: "#21b6af", m: 1, color: "#fff" }}
          >
            {activity.attendees.length} People are going
          </Typography>

          {activity.attendees.map((attd: ActivityAttendee) => (
            <Box key={attd.username}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: 1,
                  p: 2,
                  m: 2,
                  justifyContent: "flext-start",
                  alignItems: "center",
                }}
              >
                <ImageAvatar
                  apiUrl={attd.image}
                  spacing={2}
                  avatarStyle={avatarStyle1}
                />
                <Link to={`/userprofile/${attd.username}`}>
                  <Typography
                    fontSize={appFontSize}
                    textAlign="left"
                    padding={2}
                  >
                    {attd.displayName}
                  </Typography>
                </Link>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <p>updating.....</p>
      )}
    </Box>
  );
};

export default ActivityDetailRightPane;
