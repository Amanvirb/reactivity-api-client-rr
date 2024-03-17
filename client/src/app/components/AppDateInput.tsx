import { useController, UseControllerProps } from "react-hook-form";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  Partial<ReactDatePickerProps>;

export default function AppDateInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <div style={{padding: '16px 14px'}}>
      {props.label}
      <DatePicker
        {...props}
        {...field}
        onChange={(value) => field.onChange(value)}
        selected={field.value}
        name={field.name}        
        dateFormat="yyyy/MM/dd h:mm aa"
        className={`rounded-lg w-full flex flex-col ${
          fieldState.error
            ? "bg-red-50 border border-red-500 text-red-900"
            : !fieldState.invalid && fieldState.isDirty
            ? "bg-green-50 border border-green-500 text-green-900"
            : ""
        }`}
      />

      {fieldState.error ? (
        <div className="text-red-500 text-sm">{fieldState.error.message}</div>
      ) : null}
    </div>
  );
}
