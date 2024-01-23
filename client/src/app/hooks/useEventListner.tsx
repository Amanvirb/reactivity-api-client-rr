import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signInUser } from "../../features/users/account/accountSlice";
import { FieldValues } from "react-hook-form";
import { setPagination } from "../../features/activities/activitySlice";
import { updateUserProfileAsync } from "../../features/profiles/userProfileSlice";

const useEventListner = () => {

  const dispatch = useAppDispatch();
  const { activityList } = useAppSelector((state) => state.activity);

  const loginHandler = async (values: FieldValues) => {
    await dispatch(signInUser(values));
    //  .then(() => {router.navigate("/activities"); });
  };
  const onPageChangeHandler = (page: number) => {
    dispatch(setPagination(page));
  };

  const selectedActivity = (id: any) => {
    const selectedActivity = activityList.items.find((x) => x.id === id);
    if (selectedActivity) {
      return selectedActivity;
    }
  };
  const editUserProfileHandler = (data: FieldValues) => {
    dispatch(updateUserProfileAsync(data));
  };
  return {
    loginHandler,
    onPageChangeHandler,
    selectedActivity,
    editUserProfileHandler,
  };
};

export default useEventListner;
