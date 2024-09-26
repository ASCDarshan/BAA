import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Home as HomeIcon, ExitToApp as LogoutIcon } from "@mui/icons-material";
import Navbar from "./Navbar/Navbar";
import {
  Event as EventIcon,
  Description as ResourcesIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./SideBar/Sidebar";
import ajaxCall from "../../helpers/ajaxCall";

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

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

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
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
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
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <MainContent
          recommendedTopics={recommendedTopics}
          eventsData={eventsData}
          initiativesData={initiativesData}
          userID={userID}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
