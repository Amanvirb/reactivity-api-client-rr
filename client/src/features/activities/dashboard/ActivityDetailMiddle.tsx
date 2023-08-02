import { Box, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ActivityDetail } from "../../../app/models/activity";
import { format } from "date-fns";
import useUtilities from "../../../app/hooks/useUtilities";

interface ActivityProps {
  activity: ActivityDetail | null;
}

const ActivityDetailMiddle = ({ activity }: ActivityProps) => {
  const {appFontSize}=useUtilities();
  return (
    <>
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
        <InfoIcon />
        <Typography fontSize={appFontSize} textAlign="left" padding={2}>
          {activity && activity.description}
        </Typography>
      </Box>
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
        <CalendarTodayIcon />
        <Typography fontSize={appFontSize} textAlign="left" padding={2}>
          {activity && format(new Date(activity.date), "yyyy-MM-dd")}
        </Typography>
      </Box>
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
        <LocationOnIcon />
        <Typography fontSize={appFontSize} textAlign="left" padding={2}>
          {activity && activity.venue}
        </Typography>
      </Box>
    </>
  );
};

export default ActivityDetailMiddle;
