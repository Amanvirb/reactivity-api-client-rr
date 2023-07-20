import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createReducer,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import {
  Activity,
  ActivityAttendee,
  ActivityDetail,
  ActivityParams,
  FormActivity,
} from "../../app/models/activity";
import {
  deleteActivityPending,
  editCreateActivityPending,
  idle,
  joinActivityPending,
  pending,
} from "../../app/common/options/sliceOpt";
import { RootState } from "../../app/store/configureStore";
import { User } from "../../app/models/account";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";


interface ActivityState {
  activityList: Activity;
  activityDetail: ActivityDetail | null;
  activityStatus: string;
  activityParams: ActivityParams;
  activityLoaded: boolean;
  attendActivityLoaded: boolean;
  formActivityState: FormActivity | null;
  formActivityStateStatus: Boolean;
}

const activitiesAdapter = createEntityAdapter<Activity[]>();

function getAxiosParams(
  activityParams: ActivityParams,
  activityList: Activity
) {
  const params = new URLSearchParams();
  params.append("isGoing", activityParams.isGoing.toString());
  params.append("isHost", activityParams.isHost.toString());
  params.append("all", activityParams.all.toString());
  params.append("pageNumber", activityList.pagination.currentPage.toString());
  params.append("pageSize", activityList.pagination.itemsPerPage.toString());
  params.append("startDate", activityParams.startDate.toISOString());

  // params.append('orderBy', activityParams.orderBy);
  // if (activityParams.searchTerm) params.append('searchTerm', activityParams.searchTerm);
  // if (activityParams.brands.length > 0) params.append('brands', activityParams.brands.toString());
  // if (activityParams.types.length > 0) params.append('types', activityParams.types.toString());
  return params;
}

export const fetchActivityAsync = createAsyncThunk<
  any,
  void,
  { state: RootState }
>("activity/fetchActivityAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(
    thunkAPI.getState().activity.activityParams,
    thunkAPI.getState().activity.activityList
  );

  try {
    const response = await agent.Activities.getActivityList(params);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchActivityDetailAsync = createAsyncThunk<
  ActivityDetail,
  string
>("activitydetail/fetchActivityAsync", async (activityId, thunkAPI) => {
  try {
    const response = await agent.Activities.getActivityDetail(activityId);

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchAttendActivityAsync = createAsyncThunk<
  void,
  { id: string; user: User }
>("activitydetail/fetchAttendActivityAsync", async ({ id }, thunkAPI) => {
  try {
    await agent.Activities.activityAttend(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const updateActivityAsync = createAsyncThunk<void, FieldValues>(
  "activitydetail/updateActivityAsync",
  async (data, thunkAPI) => {
    try {
      await agent.Activities.updateActivity(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const createActivityAsync = createAsyncThunk<void, FieldValues>(
  "activitydetail/createActivityAsync",
  async (data, thunkAPI) => {
    try {
      await agent.Activities.createActivity(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteActivityAsync = createAsyncThunk<void, string>(
  "activitydetail/deleteActivityAsync",
  async (data, thunkAPI) => {
    try {
      await agent.Activities.deleteActivity(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

function initParams() {
  return {
    isGoing: false,
    isHost: false,
    all: false,
    startDate: new Date(),
  };
}
function initActivityDetail() {
  return {
    id: "",
    title: " ",
    date: new Date(),
    description: " ",
    category: " ",
    city: " ",
    venue: " ",
    hostUsername: " ",
    isCancelled: false,
    attendees: [],
    comments: [],
  };
}

export const activitySlice = createSlice({
  name: "activity",
  initialState: activitiesAdapter.getInitialState<ActivityState>({
    activityParams: initParams(),
    activityList: {
      items: [],
      pagination: {
        currentPage: 1,
        itemsPerPage: 3,
        totalItems: 0,
        totalPages: 0,
      },
    },
    activityDetail: initActivityDetail(),
    activityStatus: idle,

    activityLoaded: false,
    attendActivityLoaded: false,
    formActivityState: null,
    formActivityStateStatus: false,
  }),

  reducers: {
    setParams: (state, action) => {
      state.activityLoaded = false;
      state.activityList.pagination.currentPage = 1;
      if (action.payload === "isGoing") {
        state.activityParams.isGoing = true;
        state.activityParams.isHost = false;
        state.activityParams.all = false;
      }
      if (action.payload === "isHost") {
        state.activityParams.isHost = true;
        state.activityParams.isGoing = false;
        state.activityParams.all = false;
      }
      if (action.payload === "all") {
        state.activityParams.isGoing = true;
        state.activityParams.isHost = true;
        state.activityParams.all = true;
      }
    },
    setStartDate: (state, action) => {
      state.activityLoaded = false;
      state.activityList.pagination.currentPage = 1;
      state.activityParams.startDate = action.payload;
    },
    setPagination: (state, action) => {
      state.activityLoaded = false;
      state.activityList.pagination.currentPage = action.payload;
    },
    cancelActivity: (state, action) => {
      if (state.activityDetail && state.activityDetail?.id === action.payload) {
        state.activityDetail.isCancelled = !state.activityDetail?.isCancelled;
      }
    },
    setFormActivity: (state, action) => {
      state.formActivityState = action.payload;
      state.formActivityStateStatus = true;
    },
    clearActivityDetail: (state) => {
      state.activityDetail = initActivityDetail();
    },
    // updateActivityList: (state, action) => {
    //   console.log("reducer payload", action.payload);
    //   if (state.activityList.items.length > 0) {
    //     console.log("itemindex", state.activityList.items);

    //     const itemIndex = state.activityList.items.findIndex(
    //       (x) => x.id === action.payload.id
    //     );
    //     // let newItem = state.activityList.items.find(
    //     //   (x) => x.id === action.payload.id
    //     // );
    //     if (itemIndex === undefined || itemIndex < 0) return;

    //     if (itemIndex >= 0) {
    //       let updatedActivity = {
    //         ...state.activityList.items[itemIndex],
    //         ...action.payload,
    //       };
    //       state.activityList.items[itemIndex] = updatedActivity;
    //     }
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActivityAsync.pending, (state, action) => {
      state.activityStatus = pending;
    });
    builder.addCase(fetchActivityAsync.fulfilled, (state, action) => {
      state.activityList = action.payload;
      state.activityStatus = idle;
      state.activityLoaded = true;
    });
    builder.addCase(fetchActivityAsync.rejected, (state) => {
      state.activityStatus = idle;
    });
    builder.addCase(fetchActivityDetailAsync.pending, (state, action) => {
      state.activityStatus = pending;
    });
    builder.addCase(fetchActivityDetailAsync.fulfilled, (state, action) => {
      state.activityDetail = action.payload;
      state.activityStatus = idle;
      state.activityLoaded = true;
    });
    builder.addCase(fetchActivityDetailAsync.rejected, (state) => {
      state.activityStatus = idle;
    });

    builder.addCase(fetchAttendActivityAsync.pending, (state, action) => {
      state.activityStatus = joinActivityPending;
      state.attendActivityLoaded = false;
    });

    builder.addCase(fetchAttendActivityAsync.fulfilled, (state, action) => {
      const newAttendee: ActivityAttendee = {
        bio: "",
        displayName: action.meta.arg.user.displayName,
        followersCount: 0,
        following: false,
        followingCount: 0,
        image: "",
        username: action.meta.arg.user.username,
      };

      const itemIndex = state.activityDetail?.attendees?.findIndex(
        (x) => x.username === action.meta.arg.user.username
      );
      if (itemIndex === undefined || itemIndex === -1) {
        state.activityDetail?.attendees.push(newAttendee);
      } else {
        state.activityDetail?.attendees.splice(itemIndex, 1);
      }

      state.activityStatus = idle;
      state.attendActivityLoaded = true;
    });

    builder.addCase(fetchAttendActivityAsync.rejected, (state) => {
      state.activityStatus = idle;
    });

    builder.addCase(updateActivityAsync.pending, (state, action) => {
      state.activityStatus = editCreateActivityPending;
    });


    builder.addCase(updateActivityAsync.fulfilled, (state, action) => {
     
      let updatedActivity: ActivityDetail | null = null;
      //update activity list
      if (state.activityList.items.length > 0) {
        const itemIndex = state.activityList.items.findIndex(
          (x) => x.id === action.meta.arg.id
        );
        // let newItem = state.activityList.items.find(
        //   (x) => x.id === action.payload.id
        // );
        if (itemIndex === undefined || itemIndex < 0) return;

        if (itemIndex >= 0) {
        //  state.activityList.items[itemIndex] = action.meta.arg;
          updatedActivity = {
            ...state.activityList.items[itemIndex],
            ...action.meta.arg,
          };
          state.activityList.items[itemIndex] = updatedActivity;
          state.activityDetail = updatedActivity;
        }
      }
      //Update selected activity
      if (state.activityDetail) {
        if (!updatedActivity) {
          updatedActivity = {
            ...state.activityDetail,
            ...action.meta.arg,
          };
        }

        state.activityDetail = updatedActivity;
      }
      toast.success("Activity updated Successfully");
      state.activityStatus = idle;
    });

    builder.addCase(updateActivityAsync.rejected, (state, action) => {
      toast.error("Problem to update activity");
      state.activityStatus = idle;
    });
    builder.addCase(createActivityAsync.pending, (state, action) => {
      state.activityStatus = editCreateActivityPending;
    });

    builder.addCase(createActivityAsync.fulfilled, (state, action) => {
      toast.success("New activity has been added successfully");
      state.activityStatus = idle;
    });

    builder.addCase(createActivityAsync.rejected, (state) => {
      toast.error("Problem in adding a new activity");
      state.activityStatus = idle;
    });
    builder.addCase(deleteActivityAsync.pending, (state, action) => {
      state.activityStatus = deleteActivityPending;
    });

    builder.addCase(deleteActivityAsync.fulfilled, (state, action) => {
      if (state.activityList.items.length > 0) {
        const itemIndex = state.activityList.items.findIndex(
          (x) => x.id === action.meta.arg
        );
        if (itemIndex < 0 || itemIndex === undefined) return;
        if (itemIndex >= 0) {
          state.activityList.items.splice(itemIndex, 1);
        }
      }
      toast.success("Activity has been deleted successfully");
      state.activityStatus = idle;
    });

    builder.addCase(deleteActivityAsync.rejected, (state) => {
      toast.error("Problem in deleting activity");
      state.activityStatus = idle;
    });
  },
});

// export const activitySelectors = activitiesAdapter.getSelectors(
//   (state: RootState) => state.activity
// );

export const {
  setParams,
  setPagination,
  setStartDate,
  cancelActivity,
  setFormActivity,
  clearActivityDetail,
  // updateActivityList,
} = activitySlice.actions;
