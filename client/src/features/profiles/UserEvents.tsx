import { Box } from "@mui/material";
import React, { useEffect } from "react";
import useAxios from "../../app/hooks/useAxios";
import { useParams } from "react-router-dom";
import { UserActivity, UserPredicate } from "../../app/models/profile";
import { idle } from "../../app/common/options/sliceOpt";
import UserEventsCards from "./UserEventsCard";

const UserEvents = () => {
  const { username } = useParams<{ username: string }>();
  const { getUserActivities, userActivities, userActivitiesstatus } =
    useAxios();

  useEffect(() => {
    if (username) {
      const values: UserPredicate = {
        username: username,
        predicate: "",
      };
      getUserActivities(values);
    }
  }, []);

  return (
    <Box component={"div"} sx={{ flexGrow: 1 }}>
      {userActivitiesstatus === idle && userActivities.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {userActivities.map((activity: UserActivity) => (
            <UserEventsCards key={activity.id} activity={activity} />
          ))}
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default UserEvents;
