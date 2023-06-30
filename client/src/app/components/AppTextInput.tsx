import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
  label: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  value?: string;
  disablevalue?: string;
}

export default function AppTextInput(props: Props) {
  const { fieldState, field } = useController({
    ...props,
    defaultValue: props.value || "",
  });

  const dvalue = props.disablevalue === undefined ? false 
    : props.disablevalue === "true" ? true
    : props.disablevalue === "false" ? false
    : false;

  return (
    <TextField
      {...props}
      {...field}
      disabled={dvalue}
      multiline={props.multiline}
      rows={props.rows}
      type={props.type}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}
