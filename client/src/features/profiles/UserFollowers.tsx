import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useAxios from "../../app/hooks/useAxios";
import { Profile, UserPredicate } from "../../app/models/profile";
import { idle } from "../../app/common/options/sliceOpt";
import UserProfileCard from "./UserProfileCard";
interface FollowersProps {
  username: string;
  predicate: string;
}

const UserFollowers = ({ username, predicate }: FollowersProps) => {
  const [loading, setLoading] = useState(true);
  const { followingList, getFollowingList, userFollowingListStatus } =
    useAxios();

  const loadFollowing = useCallback(async () => {
    try {
      if (username && loading) {
        const data: UserPredicate = {
          username: username,
          predicate: predicate,
        };
        getFollowingList(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getFollowingList, loading, predicate, username]);

  useEffect(() => {
    loadFollowing().then(() => setLoading(false));
  }, [loadFollowing]);

  return (
    <Box>
      {userFollowingListStatus === idle && followingList.length <= 0 && (
        <p>Data not found</p>
      )}
      {userFollowingListStatus === idle ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {followingList.map((followers: Profile) => (
            <UserProfileCard key={followers.username} userProfile={followers} />
          ))}
        </Box>
      ) : (
        <p>Loading....</p>
      )}
    </Box>
  );
};

export default UserFollowers;
