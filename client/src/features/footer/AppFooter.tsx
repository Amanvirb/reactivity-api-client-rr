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
// import dk from '../../assets/dk.svg';
// import gb from '../../assets/gb.svg';
// import de from '../../assets/de.svg';
import CallIcon from "@mui/icons-material/Call";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
// import certificate from "../../assets/certificate.png";

const styles = {
  arsContainer: {
    // maxWidth: 1200,
    
    margin: "0 auto",
    padding: 40,
  },
};

export default function AppFooter() {
  return (
    <Box sx={{width:"100%", backgroundColor: "#bfbfbf"}}>
      <Box style={styles.arsContainer}>
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
              <CardHeader
              // avatar={
              //     <Avatar variant="square" alt='Denmark' src={dk} />
              // }
              />
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
                <Chip size="small" icon={<CallIcon />} label="+00 000 000 000" />
                {/* <Button size="small" startIcon={<CallIcon />}>
                                    +00 000 000 000
                                </Button> */}
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
              <CardHeader
              // avatar={
              //     <Avatar variant="square" alt='England' src={gb} />
              // }
              />
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
              <CardHeader
              // avatar={
              //     <Avatar variant="square" alt='Deutschland' src={de} />
              // }
              />
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
              <CardMedia
                component="img"
                // image={certificate}
                alt="certificates"
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      {/* <Grid container padding={2} spacing={{ xs: 2, md: 3 }} sx={{backgroundColor: '#747474'}}>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography textAlign={'center'}>Copyright 2022 | Tier 1 Asset ARS Portal</Typography>
                    
                </Grid>
            </Grid> */}
    </Box>
  );
}