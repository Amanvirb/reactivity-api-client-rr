import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Profile } from "../../app/models/profile";
import UserAbout from "./UserAbout";
import UserProfilePhotos from "./UserProfilePhotos";
import UserEvents from "./UserEvents";
import UserFollowers from "./UserFollowers";
import { Grid } from "@mui/material";
import useUtilities from "../../app/hooks/useUtilities";

interface ProfileProps {
  userProfile: Profile;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const UserProfileContainer = ({ userProfile }: ProfileProps) => {
  const [value, setValue] = React.useState(0);
  const { isMobile } = useUtilities();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} sx={{minHeight:600}}>
      <Grid item xs={12} md={3}>
        <Tabs
          orientation={isMobile ? "horizontal" : "vertical"}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          scrollButtons
          allowScrollButtonsMobile
          aria-label="User Profile"
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Photos" {...a11yProps(1)} />
          <Tab label="Events" {...a11yProps(2)} />
          <Tab label="Followers" {...a11yProps(3)} />
          <Tab label="Following" {...a11yProps(4)} />
        </Tabs>
      </Grid>
      <Grid item xs={12} md={9}>
        <TabPanel value={value} index={0}>
          <UserAbout userProfile={userProfile} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserProfilePhotos userProfile={userProfile} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserEvents />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UserFollowers
            username={userProfile.username}
            predicate="followers"
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <UserFollowers
            username={userProfile.username}
            predicate="following"
          />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default UserProfileContainer;
