import { useEffect, useState } from "react";
import { Box, Container, Grid, Paper, styled } from "@mui/material";
import useAxios from "../../../app/hooks/useAxios";
import { useParams } from "react-router-dom";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailMiddle from "./ActivityDetailMiddle";
import ActivityDetailRightPane from "./ActivityDetailRightPane";
import { pending } from "../../../app/common/options/sliceOpt";
// import ActivityEditForm from "./forms/ActivityEditForms";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: 1,
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const ActivityData = () => {
  const [showEditForm, setShowEditForm] = useState(false);

  let { id } = useParams<{ id: string }>();

  const { activityStatus, getActivityDetail, activityDetail } = useAxios();

  useEffect(() => {
    if (id && activityDetail?.id !== id) {
      getActivityDetail(id);
      console.log(activityDetail);
    }
  }, []);

  const editButtonHandler = () => {
    setShowEditForm(!showEditForm);
  };

  if (activityStatus === pending) return <p>Loading....</p>;

  return (
    <Box component={"div"} sx={{ mt: 10 }}>
      {!activityDetail && <p> Data not Found.</p>}
      {!showEditForm && (
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Item>
                    <ActivityDetailHeader
                      activity={activityDetail}
                      editButtonHandler={editButtonHandler}
                    />
                  </Item>
                </Grid>
                <Grid item xs={12}>
                  <Item>
                    <ActivityDetailMiddle activity={activityDetail} />
                  </Item>
                </Grid>
                              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Item>
                <ActivityDetailRightPane activity={activityDetail} />
              </Item>
            </Grid>
          </Grid>
        </Container>
      )}
      {/* {showEditForm && (
        <Box sx={{ border: 1, width: 800, margin: "0 auto" }}>
          <ActivityEditForm />
        </Box>
      )} */}
    </Box>
  );
};

export default ActivityData;
