import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ajaxCall from "../../../helpers/ajaxCall";
import ProfileForm from "./ProfileForm";

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
  const [userProfileData, setUserProfileData] = useState([]);
  const [count, setCount] = useState(0);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

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
    fetchData(`profiles/user-profile/${userID}/`, setUserProfileData);
  }, [count]);

  const handleCount = () => {
    setCount(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <ProfileForm
          userID={userID}
          userProfileData={userProfileData}
          handleCount={handleCount}
        />
      </Box>
    </ThemeProvider>
  );
};

export default UserProfile;
