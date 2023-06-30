import styled from "@emotion/styled";
import { Paper, Box, Grid, Typography } from "@mui/material";
import React from "react";
import useDispatchReducer from "../../../app/hooks/useDispatchReducer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useForm } from "react-hook-form";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  color: "#000",
}));

const ActivityFilters = () => {
  const { filtersHandler, filteredDateHandler } = useDispatchReducer();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      appDate: new Date(),
    },
  });

  return (
    // <Box component={"div"}  sx={{ mt: 1.5 }}>
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // p: 1.5,

            borderBottom: "2px solid #D3D3D3",
          }}
        >
          <FilterAltIcon sx={{ color: "#21b6af", fontSize: 30 }} />{" "}
          <Typography color="#21b6af" variant="h5">
            {" "}
            Filters{" "}
          </Typography>
        </Box>
        <Box
          onClick={() => filtersHandler("all")}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            borderBottom: "2px solid #D3D3D3",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#D3D3D3",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          All activities
        </Box>
        <Box
          onClick={() => filtersHandler("isGoing")}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            borderBottom: "2px solid #D3D3D3",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#D3D3D3",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          I am Going
        </Box>
        <Box
          onClick={() => filtersHandler("isHost")}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            borderBottom: "2px solid #D3D3D3",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#D3D3D3",
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          I am Hosting
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Item>
          {/* <Calendar
            
            onChange={(date: any)=>filteredDateHandler(date as Date)}
          /> */}
          {/* <Box
              component={"form"}
              // onSubmit={handleSubmit(submitHandler)}
              className="form-container"
              sx={{ m: 10 }}
            >
              <Controller
                as={AppDatePicker}
                control={control}
                valueName="appdate"
                name="appDate"
                onChange={(date: any) => filteredDateHandler(date as Date)}
              />
            </Box> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(date: any) => filteredDateHandler(date as Date)}
            />
          </LocalizationProvider>
        </Item>
      </Grid>
    </Grid>
    // </Box>
  );
};

export default ActivityFilters;
