import { Box, Paper, Tooltip, Typography, styled } from "@mui/material";
import React from "react";
import ImageAvatar from "../../../app/components/ImageAvatar";
import { ActivityAttendee, ActivityDetail } from "../../../app/models/activity";
import { router } from "../../../app/layout/Routes";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CommonButton from "../../../app/common/CommonButton";
import useAxios from "../../../app/hooks/useAxios";
import { format } from "date-fns";
import { firstLetterUpper } from "../../../app/util/utilities";
import useUtilities from "../../../app/hooks/useUtilities";
import UserProfileCard from "../../profiles/UserProfileCard";
interface Props {
  activity: ActivityDetail;
}

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  color: theme.palette.text.secondary,
  minHeight: 150,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexGrow: 1,
 }));
const avatarStyle = {
  width: 100,
  height: 100,
};
const avatarStyle1 = {
  width: 40,
  height: 40,
};

export default function ActivityListItem({ activity }: Props) {
  const { user } = useAxios();
  const { isMobile, isMediumScreen } = useUtilities();

  return (
    // <Box component={"div"}>
      <Item1 elevation={1}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            pl: 2,
            borderBottom: "2px solid #D3D3D3",
          }}
        >
          <ImageAvatar
            apiUrl={
              activity.attendees.find(
                (x) => x.username === activity.hostUsername
              )?.image || ""
            }
            spacing={2}
            avatarStyle={avatarStyle}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: 5,
                flexGrow: 1,
                p: 2,
              }}
            >
              <Typography textAlign="left" sx={{ pt: 2 }}>
                {firstLetterUpper(activity.title)}
              </Typography>
              <Typography textAlign="left" sx={{ pt: 2, pb: 1 }}>
                Host: {activity.hostUsername.toUpperCase()}
              </Typography>
              {activity.hostUsername === user?.username && (
                <Typography
                  textAlign="left"
                  sx={{
                    p: 1,
                    color: "#f2722b",
                    border: isMobile ? 0 : "1px solid #f2722b",
                    width: isMobile ? 50 : 200,
                    fontSize: isMobile ? 10 : 14,
                  }}
                >
                  "You are hosting this activity"
                </Typography>
              )}
              <Typography
                textAlign="left"
                sx={{
                  // p: 1,
                  color: "#21b6af",
                  width: 200,
                  fontSize: 14,
                }}
              >
                {activity.attendees.find(
                  (x) => x.username === user?.username
                ) && activity.hostUsername !== user?.username
                  ? "You are going to this activity"
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            p: 2,
            borderBottom: "2px solid #D3D3D3",
          }}
        >
          <QueryBuilderIcon />
          <Typography sx={{ pl: 1 }}>
            {format(new Date(activity.date), "yyyy-MM-dd")}
          </Typography>
          <LocationOnIcon sx={{ pl: 2 }} />
          <Typography sx={{ pl: 1 }}> {activity.venue}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            bgcolor: "#f3f4f5",
            pt: 1,
            pb: 1,
            borderBottom: "2px solid #D3D3D3",
          }}
        >
          {activity.attendees.map((attendee: ActivityAttendee) => (
            <Tooltip title={<UserProfileCard userProfile={attendee}/>} key={attendee.username} placement="top" arrow>
              <Box sx={{ pl: 1 }}>
                <ImageAvatar
                  apiUrl={attendee.image}
                  spacing={2}
                  avatarStyle={avatarStyle1}
                />
              </Box>
            </Tooltip>
          ))}
          {/* {activity.attendees.map((attendee: ActivityAttendee) => (
            <Box key={attendee.username} sx={{ pl: 2 }}>
              <ImageAvatar
                apiUrl={attendee.image}
                spacing={2}
                avatarStyle={avatarStyle1}
              />
              <Tooltip title={attendee.username}>
                <Typography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  {attendee.username}
                </Typography>
              </Tooltip>
            </Box>
          ))} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            p: 1,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography textAlign="left">{activity.description}</Typography>
          </Box>
          <CommonButton
            text="View"
            onClickHandler={() =>
              router.navigate(`/activitydetail/${activity.id}`)
            }
          />
        </Box>
      </Item1>
    // </Box>
  );
}
