import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Divider,
  Paper,
  useMediaQuery,
  Button,
  Container,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Event as EventIcon,
  Description as ResourcesIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../SideBar/Sidebar";
import ajaxCall from "../../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
  },
});

const UserProfile = () => {
  const [userProfileData, setUserProfileData] = useState(null);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/updateProfile");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/dashboard" },
    { text: "Events", icon: <EventIcon />, link: "/addEvents" },
    { text: "Subevent", icon: <CalendarViewMonthIcon />, link: "/subEvents" },
    { text: "Initiatives", icon: <ResourcesIcon />, link: "/addInitiatives" },
    { text: "Profile", icon: <AccountCircleIcon />, link: "/userProfile" },
    { text: "Log Out", icon: <LogoutIcon />, link: "/login" },
  ];

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData(`profiles/user-profile/${userID}/`, setUserProfileData);
  }, [userID]);

  if (!userProfileData) return null;

  const {
    profile_picture,
    bio,
    linkedin_profile,
    twitter_profile,
    facebook_profile,
    company,
    job_title,
    Education,
    degree,
    birth_date,
    phone_number,
    school_graduation_year,
    year_of_graduation,
    user: { username },
  } = userProfileData;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar userProfileData={userProfileData} />
        <Sidebar
          isSmallScreen={isSmallScreen}
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          menuItems={menuItems}
          drawerWidth={drawerWidth}
        />
        <Container sx={{ mt: 10 }}>
          <Box>
            <Paper
              elevation={3}
              sx={{ p: 3, backgroundColor: theme.palette.background.paper }}
            >
              <Grid container spacing={2}>
                {/* Profile Picture and Username */}
                <Grid item xs={12} sm={4} textAlign="center">
                  <Avatar
                    alt={username}
                    src={profile_picture}
                    sx={{ width: 150, height: 150, margin: "auto" }}
                  />
                  <Typography variant="h6" mt={2}>
                    {username}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {job_title} From {school_graduation_year} Batch
                  </Typography>
                </Grid>

                {/* Bio and Social Links */}
                <Grid item xs={12} sm={8}>
                  <Typography variant="h6">Bio</Typography>
                  <Typography variant="body1" paragraph>
                    {bio || "Update Profile"}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">Social Profiles</Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={linkedin_profile}
                      target="_blank"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={twitter_profile}
                      target="_blank"
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={facebook_profile}
                      target="_blank"
                    >
                      Facebook
                    </Button>
                  </Box>
                </Grid>

                {/* Education, Skills, and Additional Information */}
                <Grid item xs={12}>
                  <Typography variant="h6">Education</Typography>
                  <Typography variant="body1">
                    {Education
                      ? `${Education} in ${degree}`
                      : "No education details"}
                  </Typography>
                  <Typography variant="body1">
                    Graduation Year :{year_of_graduation}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">Contact Details</Typography>
                  <Typography variant="body1" paragraph>
                    Phone Number: {phone_number}
                  </Typography>
                </Grid>

                {/* Additional Information */}
                <Grid item xs={12}>
                  <Typography variant="h6">Additional Information</Typography>
                  <Typography variant="body1">
                    Birth Date: {birth_date}
                  </Typography>
                  <Typography variant="body1">
                    Graduation Year: {school_graduation_year || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Grid item xs={12} container justifyContent="flex-end" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
