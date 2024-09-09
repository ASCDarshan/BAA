import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Home as HomeIcon,
  ContactPhone as DirectoryIcon,
  Description as ResourcesIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import Navbar from "./Navbar/Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./SideBar/Sidebar";
import ajaxCall from "../../helpers/ajaxCall";

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

const Dashboard = () => {
  const [eventsData, setEventsData] = useState([]);
  const [initiativesData, setInitiativesData] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Profile", icon: <AccountCircleIcon />, Link: "/userProfile" },
    { text: "Log Out", icon: <LogoutIcon />, Link: "/login" },
  ];

  const recommendedTopics = [
    "Freelance",
    "Productivity",
    "Business",
    "Psychology",
    "Tips",
    "Mindfulness",
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
    fetchData("events/events/", setEventsData);
    fetchData("initiatives/initiatives/", setInitiativesData);
    fetchData("profiles/user-profile", setUserProfileData);
  }, []);

  const events = [
    { id: 1, title: "Annual Alumni Dinner", date: "2023-09-15" },
    { id: 2, title: "Career Fair", date: "2023-10-01" },
  ];

  const initiatives = [
    {
      id: 1,
      title: "Scholarship Fund",
      description: "Help support future students",
    },
    {
      id: 2,
      title: "Mentorship Program",
      description: "Guide current students in their career paths",
    },
  ];

  const suggestedAlumni = [
    { id: 1, name: "Alice Johnson", graduationYear: 2018 },
    { id: 2, name: "Bob Williams", graduationYear: 2019 },
  ];

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
        <MainContent
          tabValue={tabValue}
          handleTabChange={handleTabChange}
          recommendedTopics={recommendedTopics}
          events={events}
          initiatives={initiatives}
          suggestedAlumni={suggestedAlumni}
          eventsData={eventsData}
          initiativesData={initiativesData}
          userProfileData={userProfileData}
          userID={userID}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
