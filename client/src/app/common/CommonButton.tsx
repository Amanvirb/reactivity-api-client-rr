import React from "react";
import { commonBtnStyles } from "./options/commonBtnStyles";
import { LoadingButton } from "@mui/lab";

interface ButtonProps {
  text: string;
  onClickHandler?: () => void;
  status?: boolean;
}

const CommonButton = ({ text, onClickHandler, status }: ButtonProps) => {
  return (
    <div>
      <LoadingButton
        loading={status}
        onClick={onClickHandler}
        sx={commonBtnStyles.btnStyle}
      >
        {text}
      </LoadingButton>
    </div>
  );
};

export default CommonButton;
