import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import {
  deleteUserPhotoPending,
  editProfilePending,
  idle,
  pending,
  setMainPhotoPending,
  userPhotoUploadPending,
  userProfileUpdateIdle,
} from "../../app/common/options/sliceOpt";
import {
  Photo,
  Profile,
  UserActivity,
  UserPredicate,
} from "../../app/models/profile";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { User } from "../../app/models/account";

interface ProfileState {
  profile: Profile | null;
  userActivities: UserActivity[];
  userProfilestatus: string;
  userActivitiesstatus: string;
  userFollowingListStatus: string;
  status: string;
  profileStatus: string;
  followUnfollowStatus: string;
  followingList: Profile[];
}
const initialState: ProfileState = {
  profile: null,
  userActivities: [],
  userProfilestatus: idle,
  userActivitiesstatus: idle,
  userFollowingListStatus: idle,
  status: idle,
  profileStatus: idle,
  followUnfollowStatus: idle,
  followingList: [],
};

const currentUser: User | null = JSON.parse(localStorage.getItem("user")!);

export const fetchProfileAsync = createAsyncThunk<Profile, string>(
  "profile/fetchprofileAsync",
  async (username, thunkAPI) => {
    try {
      const response = await agent.Profiles.get(username);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk<void, FieldValues>(
  "profile/updateUserProfileAsync",
  async (data, thunkAPI) => {
    try {
      await agent.Profiles.updateProfile(data).then(() => {});
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFollowUnfollowAsync = createAsyncThunk<void, string>(
  "profile/fetchFollowUnfollowAsync",
  async (username, thunkAPI) => {
    try {
      await agent.Profiles.updateFollowing(username);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchUserActivitiesAsync = createAsyncThunk<
  UserActivity[],
  UserPredicate
>("profile/fetchUserActivitiesAsync", async (data, thunkAPI) => {
  try {
    const response = await agent.Profiles.userActivitiesList(
      data.username,
      data.predicate
    );
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchFollowingListAsync = createAsyncThunk<
  Profile[],
  UserPredicate
>("profile/fetchFollowingListAsync", async (data, thunkAPI) => {
  try {
    const response = await agent.Profiles.listFollowings(
      data.username,
      data.predicate
    );
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const uploadUserPhotosAsync = createAsyncThunk<Photo, Blob>(
  "profile/uploadUserPhotosAsync",
  async (file, thunkAPI) => {
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      console.log("responsesss", response);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteUserPhototAsync = createAsyncThunk<void, string>(
  "profile/deleteUserPhototAsync",
  async (id, thunkAPI) => {
    try {
      await agent.Profiles.deletePhoto(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const setUserMainPhototAsync = createAsyncThunk<void, string>(
  "profile/setUserMainPhototAsync",
  async (id, thunkAPI) => {
    try {
      await agent.Profiles.setMainPhoto(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const userProfileSlice = createSlice({
  name: "userprofile",
  initialState,
  reducers: {
    clearProfileStatus: (state) => {
      state.profileStatus = idle;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProfileAsync.pending, (state, action) => {
      state.userProfilestatus = pending;
    });
    builder.addCase(fetchProfileAsync.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.userProfilestatus = idle;
    });
    builder.addCase(fetchProfileAsync.rejected, (state) => {
      state.userProfilestatus = idle;
    });
    builder.addCase(fetchUserActivitiesAsync.pending, (state) => {
      state.userActivitiesstatus = pending;
    });
    builder.addCase(fetchUserActivitiesAsync.fulfilled, (state, action) => {
      state.userActivities = action.payload;
      state.userActivitiesstatus = idle;
    });
    builder.addCase(fetchUserActivitiesAsync.rejected, (state) => {
      state.userActivitiesstatus = idle;
    });
    builder.addCase(fetchFollowUnfollowAsync.pending, (state) => {
      state.followUnfollowStatus = pending;
    });
    builder.addCase(fetchFollowUnfollowAsync.fulfilled, (state, action) => {
      if (state.profile && currentUser) {
        const newFollower = {
          bio: "",
          displayName: currentUser.displayName,
          followersCount: 0,
          following: false,
          followingCount: 0,
          image: "",
          username: currentUser.username,
          photos: [],
        };

        const itemIndex = state.followingList.findIndex(
          (x) => x.username === currentUser.username
        );

        if (itemIndex === undefined || itemIndex < 0) {
          state.followingList.push(newFollower);
          state.profile.followersCount += 1;
        } else {
          state.followingList.splice(itemIndex, 1);
          state.profile.followersCount -= 1;
        }
        state.profile.following = !state.profile.following;
      }

      state.followUnfollowStatus = idle;
    });
    builder.addCase(fetchFollowUnfollowAsync.rejected, (state) => {
      state.followUnfollowStatus = idle;
    });

    builder.addCase(fetchFollowingListAsync.pending, (state) => {
      state.userFollowingListStatus = pending;
    });
    builder.addCase(fetchFollowingListAsync.fulfilled, (state, action) => {
      state.followingList = action.payload;
      state.userFollowingListStatus = idle;
    });
    builder.addCase(fetchFollowingListAsync.rejected, (state) => {
      state.userFollowingListStatus = idle;
    });
    builder.addCase(updateUserProfileAsync.pending, (state) => {
      state.profileStatus = editProfilePending;
    });
    builder.addCase(updateUserProfileAsync.fulfilled, (state, action) => {
      state.profileStatus = userProfileUpdateIdle;

      if (state.profile) {
        state.profile.displayName = action.meta.arg.displayName;
        state.profile.bio = action.meta.arg.bio;
      }
      toast.success("Your Profile has been updated succefully");
    });
    builder.addCase(updateUserProfileAsync.rejected, (state) => {
      state.profileStatus = idle;
    });
    builder.addCase(uploadUserPhotosAsync.pending, (state, action) => {
      state.status = userPhotoUploadPending;
    });
    builder.addCase(uploadUserPhotosAsync.fulfilled, (state, action) => {
      if (state.profile) {
        state.profile.photos.push(action.payload);
      }
      state.status = idle;
    });
    builder.addCase(uploadUserPhotosAsync.rejected, (state) => {
      state.status = idle;
    });
    builder.addCase(deleteUserPhototAsync.pending, (state, action) => {
      state.status = deleteUserPhotoPending + action.meta.arg;
    });
    builder.addCase(deleteUserPhototAsync.fulfilled, (state, action) => {
      if (state.profile) {
        const itemIndex = state.profile.photos.findIndex(
          (x) => x.id === action.meta.arg
        );

        if (itemIndex === undefined || itemIndex === -1) return;

        if (itemIndex >= 0) {
          state.profile.photos.splice(itemIndex, 1);
        }
      }
      state.status = idle;
    });
    builder.addCase(deleteUserPhototAsync.rejected, (state) => {
      state.status = idle;
    });
    builder.addCase(setUserMainPhototAsync.pending, (state, action) => {
      state.status = setMainPhotoPending + action.meta.arg;
    });
    builder.addCase(setUserMainPhototAsync.fulfilled, (state, action) => {
      if (state.profile) {
        const itemIndex = state.profile.photos.findIndex(
          (x) => x.id === action.meta.arg
        );

        if (itemIndex >= 0) {
          state.profile.photos.forEach((photo) => {
            if (photo.id === action.meta.arg) {
              photo.isMain = true;
            } else {
              photo.isMain = false;
            }
          });

          state.profile.image = state.profile.photos[itemIndex].url;
        }
      }
      state.status = idle;
    });
    builder.addCase(setUserMainPhototAsync.rejected, (state) => {
      state.status = idle;
    });
  },
});

export const { clearProfileStatus } = userProfileSlice.actions;
// export const activitySelectors = activitiesAdapter.getSelectors(
//   (state: RootState) => state.activity
// );
