import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainContent from "./MainContent/MainContent";
import ajaxCall from "../../helpers/ajaxCall";
import DashboardTwo from "./DashboardTwo";

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
  const [paymentData, setPaymentData] = useState([]);
  const [initiativesData, setInitiativesData] = useState([]);
  const [count, setCount] = useState(0);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

  const isLifetimeMember = paymentData.some(
    (data) => data.user === userID && data.is_member === true
  );

  const checkMember = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginInfo?.accessToken}`,
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
  }, []);

  useEffect(() => {
    fetchData("initiatives/initiatives/", setInitiativesData);
  }, [count]);

  useEffect(() => {
    checkMember(`accounts/member/list/`, setPaymentData);
  }, [count]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        {isLifetimeMember ? (
          <MainContent
            eventsData={eventsData}
            initiativesData={initiativesData}
            userID={userID}
            setCount={setCount}
          />
        ) : (
          <DashboardTwo setCount={setCount} />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
