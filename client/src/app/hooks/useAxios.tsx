import { useAppDispatch, useAppSelector } from "../store/configureStore";
import {
  createActivityAsync,
  deleteActivityAsync,
  fetchActivityAsync,
  fetchActivityDetailAsync,
  fetchAttendActivityAsync,
  updateActivityAsync,
} from "../../features/activities/activitySlice";
import {
  deleteUserPhototAsync,
  fetchFollowUnfollowAsync,
  fetchFollowingListAsync,
  fetchProfileAsync,
  fetchUserActivitiesAsync,
  setUserMainPhototAsync,
  uploadUserPhotosAsync,
} from "../../features/profiles/userProfileSlice";
import { UserPredicate } from "../models/profile";
import { RegisterForm, User, VerifyEmail } from "../models/account";
import {
  fbSignInUser,
  registerUser,
  verifyEmail,
} from "../../features/users/account/accountSlice";
import { FieldValues } from "react-hook-form";
import { router } from "../layout/Routes";
import {
  deleteBlog,
  editBlog,
  setBlogDetail,
  setBlogList,
} from "../../features/blog/blogSlice";

const useAxios = () => {
  const dispatch = useAppDispatch();
  const { user, accountStatus } = useAppSelector((state) => state.account);
  const {
    profile,
    userProfilestatus,
    userActivitiesstatus,
    userFollowingListStatus,
    userActivities,
    followingList,
    followUnfollowStatus,
    status,
    profileStatus,
  } = useAppSelector((state) => state.profile);
  const {
    activityList,
    activityLoaded,
    activityParams,
    activityDetail,
    activityStatus,
    formActivityState,
    formActivityStateStatus,
  } = useAppSelector((state) => state.activity);

  const { blogStatus, blogList, loading, blog } = useAppSelector(
    (state) => state.blog
  );

  const getActivityList = () => {
    dispatch(fetchActivityAsync());
  };

  const getActivityDetail = (activityId: string) => {
    dispatch(fetchActivityDetailAsync(activityId));
  };

  const attendActivity = (id: string, user: User) => {
    dispatch(fetchAttendActivityAsync({ id, user }));
  };
  const getUserProfile = (username: string) => {
    dispatch(fetchProfileAsync(username));
  };
  const getUserActivities = (data: UserPredicate) => {
    dispatch(fetchUserActivitiesAsync(data));
  };

  const followBtnHandler = (username: string) => {
    dispatch(fetchFollowUnfollowAsync(username));
  };
  const getFollowingList = (data: UserPredicate) => {
    dispatch(fetchFollowingListAsync(data));
  };

  const registerNewUserHandler = async (data: RegisterForm) => {
    await dispatch(registerUser(data)).then(() => {
      router.navigate("/loginform");
    });
  };

  const verifyEmailHandler = (data: VerifyEmail) => {
    dispatch(verifyEmail(data));
  };

  const fbLoginHandler = (accessToken: string) => {
    dispatch(fbSignInUser(accessToken));
  };

  const userPhotoUploadHandler = (file: Blob) => {
    dispatch(uploadUserPhotosAsync(file));
  };

  const deleteUserPhototHandler = (id: string) => {
    dispatch(deleteUserPhototAsync(id));
  };
  const setMainPhotoHandler = (id: string) => {
    dispatch(setUserMainPhototAsync(id)).then(() => {
      dispatch(fetchActivityAsync());
    });
  };

  const updateActivityHandler = async (activity: FieldValues) => {
    await dispatch(updateActivityAsync(activity)).then(() => {
      router.navigate(`/activitydetail/${activity.id}`);
    });
  };

  const createActivityHandler = async (activity: FieldValues) => {
    await dispatch(createActivityAsync(activity)).then(() =>
      dispatch(fetchActivityAsync()).then(() => router.navigate(`/activities`))
    );
  };

  const addBlogHandler = (blog: FieldValues) => {
    // dispatch(addBlog(blog));
    dispatch(setBlogList(blog));
  };
  const deleteBlogHandler = (id: string) => {
    dispatch(deleteBlog(id));
  };
  const currentBlogHandler = (blogId: string) => {
    dispatch(setBlogDetail(blogId));
  };
  const updateBlogHandler = (updatedBlog: FieldValues) => {
    dispatch(editBlog(updatedBlog));
  };
  const deleteActivityAsyncHandler = (activityId: string) => {
    dispatch(deleteActivityAsync(activityId)).then(() => {
      dispatch(fetchActivityAsync());
    });
  };

  return {
    user,
    activityList,
    activityLoaded,
    activityParams,
    activityDetail,
    profile,
    userProfilestatus,
    accountStatus,
    activityStatus,
    userActivitiesstatus,
    userFollowingListStatus,
    followUnfollowStatus,
    userActivities,
    followingList,
    status,
    profileStatus,
    formActivityState,
    formActivityStateStatus,
    blogList,
    blogStatus,
    loading,
    blog,
    currentBlogHandler,
    updateBlogHandler,
    deleteBlogHandler,
    getActivityList,
    getActivityDetail,
    attendActivity,
    getUserProfile,
    getUserActivities,
    followBtnHandler,
    getFollowingList,
    registerNewUserHandler,
    verifyEmailHandler,
    fbLoginHandler,
    userPhotoUploadHandler,
    deleteUserPhototHandler,
    setMainPhotoHandler,
    updateActivityHandler,
    createActivityHandler,
    deleteActivityAsyncHandler,
    addBlogHandler,
  };
};

export default useAxios;
