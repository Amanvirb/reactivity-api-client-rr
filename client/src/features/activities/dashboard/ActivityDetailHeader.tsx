import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { ActivityAttendee, ActivityDetail } from "../../../app/models/activity";
import useAxios from "../../../app/hooks/useAxios";
import { joinActivityPending } from "../../../app/common/options/sliceOpt";
import { router } from "../../../app/layout/Routes";
import CommonButton from "../../../app/common/CommonButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useDispatchReducer from "../../../app/hooks/useDispatchReducer";
import { format } from "date-fns";
import useUtilities from "../../../app/hooks/useUtilities";

interface ActivityProps {
  activity: ActivityDetail | null;
  editButtonHandler: () => void;
}

const ActivityDetailHeader = ({ activity }: ActivityProps) => {
  const { user, attendActivity, activityStatus } = useAxios();
  const { cancelActivityHandler } = useDispatchReducer();
  const { appFontSize, isMobile } = useUtilities();

  return (
    <>
      <Box
        component={"div"}
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: 30,
            }}
          >
            <Tooltip
              title="Back"
              sx={{ cursor: "pointer" }}
              onClick={() => router.navigate("/activities")}
            >
              <ArrowBackIcon />
            </Tooltip>
            <Typography
              fontSize={12}
              color="red"
              bgcolor={activity?.isCancelled ? "yellow" : "#fff"}
            >
              {activity?.isCancelled ? "This activity has been cancelled" : ""}
            </Typography>
          </Box>
          <CardMedia
            component="img"
            image={`../categoryImages/${activity?.category}.jpg`}
            alt={activity?.title}
          />
        </Card>
        <Box
          sx={{
            position: "absolute",
            top: isMobile ? 50 : 200,
            left: isMobile ? 15 : 30,
          }}
        >
          <Typography fontSize={appFontSize} textAlign="left" variant="h6">
            {activity && activity.description}
          </Typography>
          <Typography fontSize={appFontSize} textAlign="left" variant="h6">
            {activity && format(new Date(activity.date), "yyyy-MM-dd")}
          </Typography>
          <Typography fontSize={appFontSize} textAlign="left" variant="h6">
            Hosted by: {activity && activity.hostUsername}
          </Typography>
        </Box>
      </Box>

      {activity &&
        user &&
        activity.hostUsername !== user.username &&
        activity.attendees.length > 0 &&
        (activityStatus === joinActivityPending ? (
          <CircularProgress />
        ) : (
          <CommonButton
            text={
              activity.attendees.find(
                (x: ActivityAttendee) => x.username === user.username
              )
                ? "Leave Event"
                : "Join Activity"
            }
            onClickHandler={() => attendActivity(activity.id, user)}
          />
        ))}
      {activity && user && activity.hostUsername === user?.username && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CommonButton
            text="Edit Activity"
            onClickHandler={() =>
              router.navigate(`/editactivity/${activity.id}`)
            }
          />
          <CommonButton
            text={!activity.isCancelled ? "Cancel Activity" : "Re-activate"}
            onClickHandler={() => cancelActivityHandler(activity.id)}
          />
        </Box>
      )}
    </>
  );
};

export default ActivityDetailHeader;
