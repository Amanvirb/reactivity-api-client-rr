import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";

interface Props {
  leftCol: number;
  rightCol: number;
  times: number;
}

export default function TwoColumnLoadingSkelton({
  leftCol,
  rightCol,
  times = 1,
}: Props) {
  const items = () => {
    let its: React.JSX.Element[] = [];
    for (let index = 0; index < times; index++) {
      its.push(
        <Grid item xs={12} lg={leftCol}>
          <Stack spacing={1}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton variant="rectangular" width="100%" height={250} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Stack>
        </Grid>
      );
      its.push(
        <Grid item xs={12} lg={rightCol}>
          <Stack spacing={1}>
            <Skeleton />
            <Skeleton variant="circular" width={80} height={80} />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton variant="rectangular" width="100%" height={250} />
          </Stack>
        </Grid>
      );
    }
    return its;
  };
  return (
    <Box component={"div"} sx={{ m: 6 }}>
      <Grid container spacing={4}>
        {items()}
      </Grid>
    </Box>
  );
}
