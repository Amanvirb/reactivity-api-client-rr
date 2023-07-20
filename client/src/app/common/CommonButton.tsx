import React from "react";
import { commonBtnStyles } from "./options/commonBtnStyles";
import { LoadingButton } from "@mui/lab";

interface ButtonProps {
  text: string;
  onClickHandler?: () => void;
  status?: boolean;
  endIcon?:any;
}

const CommonButton = ({ text, onClickHandler, status, endIcon }: ButtonProps) => {
  return (
    <div>
      <LoadingButton
        loading={status}
        onClick={onClickHandler}
        sx={commonBtnStyles.btnStyle}
        endIcon={endIcon}
      >
        {text}
      </LoadingButton>
    </div>
  );
};

export default CommonButton;
