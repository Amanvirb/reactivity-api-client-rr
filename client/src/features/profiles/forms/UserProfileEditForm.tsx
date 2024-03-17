import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Stack } from "@mui/material";
import useEventListner from "../../../app/hooks/useEventListner";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import useAxios from "../../../app/hooks/useAxios";
import {
  editProfilePending,
  userProfileUpdateIdle,
} from "../../../app/common/options/sliceOpt";
import CommonButton from "../../../app/common/CommonButton";
import { LoadingButton } from "@mui/lab";
import { commonBtnStyles } from "../../../app/common/options/commonBtnStyles";
import { clearProfileStatus } from "../userProfileSlice";
import AppTextInput from "../../../app/components/AppTextInput";

interface Props {
  editButtonHandler: () => void;
}

const UserProfileEditForm = ({ editButtonHandler }: Props) => {
  const { profileStatus } = useAppSelector((state) => state.profile);
  const { profile } = useAxios();
  const { editUserProfileHandler } = useEventListner();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    setValue,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (profileStatus === userProfileUpdateIdle) {
      editButtonHandler();
      dispatch(clearProfileStatus());
    }
  }, [profileStatus, editButtonHandler, dispatch]);

  useEffect(() => {
    if (profile) {
      setValue("displayName", profile.displayName);
      setValue("bio", profile.bio);
    }
  }, [profile, setValue]);

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(editUserProfileHandler)}
      className="form-container"
    >
      <Stack direction="column" alignItems="flex-end" spacing={2}>
        <AppTextInput
          name="displayName"
          label="Display Name"
          control={control}
        />
        <AppTextInput name="bio" label="Bio" control={control} />
        <Stack direction="row" spacing={2}>
          <LoadingButton
            loading={profileStatus.includes(editProfilePending)}
            variant="contained"
            type="submit"
            size="small"
            sx={commonBtnStyles.btnStyle}
          >
            Update
          </LoadingButton>
          <CommonButton text="Cancel" onClickHandler={editButtonHandler} />
          <CommonButton
            text={profileStatus}
            onClickHandler={editButtonHandler}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserProfileEditForm;
