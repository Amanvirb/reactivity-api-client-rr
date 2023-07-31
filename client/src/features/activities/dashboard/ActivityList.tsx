import React, { useEffect } from "react";
import { Box, Grid, Paper, Tooltip, Typography, styled } from "@mui/material";
import ActivityListItem from "./ActivityListItem";
import useAxios from "../../../app/hooks/useAxios";
import ActivityFilters from "./ActivityFilters";
import PaginationComponent from "../PaginationComponent";
import {
  deleteActivityPending,
  idle,
  pending,
} from "../../../app/common/options/sliceOpt";
import { ActivityDetail } from "../../../app/models/activity";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(() => ({
  padding: 1,
  textAlign: "center",
  color: "#000",
}));

const Item1 = styled(Paper)(() => ({
  marginTop: 6,
  padding: 1,
  textAlign: "center",
  color: "#000",
}));

const ActivityList = () => {
  const {
    deleteActivityAsyncHandler,
    getActivityList,
    activityList,
    activityStatus,
    user,
  } = useAxios();

  useEffect(() => {
    if (activityList.items.length <= 0) {
      getActivityList();
    }
  }, []);

  if (activityStatus === pending) return <p>Loading....</p>;

  return (
    <Box component={"div"} sx={{ m: 6 }}>
      {activityStatus === idle && activityList.items.length < 1 && (
        <p>Data not found...</p>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={4}>
          <Item1>
            <ActivityFilters />
          </Item1>
        </Grid>
        <Grid item xs={12} lg={8}>
          {activityList?.items.map((activity: ActivityDetail) => (
            <Box component="div" key={activity.id}>
              <Box
                sx={{
                  mt: 1,
                  pb: 0.25,
                  height: 25,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  bgcolor: "#D6CFC7",
                }}
              >
                <Typography
                  textAlign="left"
                  sx={{
                    height: 25,
                    color: "#21b6af",
                    fontSize: 14,
                  }}
                >
                  {format(new Date(activity.date), "yyyy-MM-dd")}
                </Typography>
                {activity.hostUsername === user?.username && (
                  <Tooltip
                    title="Delete Activity"
                    sx={{ cursor: "pointer", color: "#21b6af" }}
                    onClick={() => deleteActivityAsyncHandler(activity.id)}
                  >
                    {activityStatus === deleteActivityPending ? (
                      <CircularProgress sx={{ size: "2rem" }} />
                    ) : (
                      <DeleteIcon />
                    )}
                  </Tooltip>
                )}
              </Box>
              <Item key={activity.id}>
                <ActivityListItem activity={activity} />
              </Item>
            </Box>
          ))}
        </Grid>
      </Grid>
      <PaginationComponent />
    </Box>
  );
};

export default ActivityList;
