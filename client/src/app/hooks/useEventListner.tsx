import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { FieldValues } from "react-hook-form";
import { setPagination } from "../../features/activities/activitySlice";
import { updateUserProfileAsync } from "../../features/profiles/userProfileSlice";

const useEventListner = () => {

  const dispatch = useAppDispatch();
  const { activityList } = useAppSelector((state) => state.activity);

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
    onPageChangeHandler,
    selectedActivity,
    editUserProfileHandler,
  };
};

export default useEventListner;
