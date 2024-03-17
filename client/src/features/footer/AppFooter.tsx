import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

const styles = {
  footerContainer: {
    margin: "0 auto",
    padding: 40,
  },
};

export default function AppFooter() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "#bfbfbf", m: 8 }}>
      <Box style={styles.footerContainer}>
        <Grid
          container
          padding={4}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{ maxWidth: 400, height: "100%", backgroundColor: "inherit" }}
              elevation={0}
            >
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  <strong> Company Name</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address Line1 <br />
                  Address Line2 <br />
                  Address Line3
                  <br />
                  City
                  <br />
                  Country
                </Typography>
                <Chip
                  size="small"
                  icon={<CallIcon />}
                  label="+00 000 000 000"
                />
                <Typography variant="h6" color="text.secondary">
                  <strong>Office hours:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <em>Weekdays: 08:00-1600 GMT+1 </em>
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  <strong> Warehouse hours:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <em>Weekdays: 08:00-1600 GMT+1</em>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{ maxWidth: 400, height: "100%", backgroundColor: "inherit" }}
              elevation={0}
            >
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  <strong> Company Name</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address Line1 <br />
                  Address Line2 <br />
                  Address Line3
                  <br />
                  City
                  <br />
                  Country
                </Typography>
                <br />
                <Chip
                  size="small"
                  icon={<CallIcon />}
                  label="+00 000 000 000"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{ maxWidth: 400, height: "100%", backgroundColor: "inherit" }}
              elevation={0}
            >
              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  <strong>Office NAme</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address Line1 <br />
                  Address Line2 <br />
                  Address Line3
                  <br />
                  City
                  <br />
                  Country
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                  General Manager <br />
                  ABC
                </Typography>
                <Chip
                  size="small"
                  icon={<CallIcon />}
                  label="+00 (0) 111 111 111"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{ maxWidth: 400, height: "100%", backgroundColor: "inherit" }}
              elevation={0}
            >
              <CardHeader
                avatar={
                  <Avatar variant="square">
                    {" "}
                    <WorkspacePremiumIcon
                      fontSize="large"
                      color="success"
                    />{" "}
                  </Avatar>
                }
                title={
                  <Typography variant="h6" color="text.secondary">
                    <strong>Certificates</strong>
                  </Typography>
                }
              />
              <CardMedia component="img" alt="certificates" />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
