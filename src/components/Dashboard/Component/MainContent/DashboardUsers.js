import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";

const DashboardUsers = () => {
  const [userProfileData, setUserProfileData] = useState();
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
    fetchData(`profiles/user-profile/`, setUserProfileData);
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        People You May Know
      </Typography>
      <List>
        {Array.isArray(userProfileData) &&
          userProfileData.map((data) => (
            <ListItem key={data.id}>
              <ListItemAvatar>
                <Avatar sx={{ mr: 1 }}>
                  {data.user.username
                    ? data.user.username.charAt(0).toUpperCase()
                    : "A"}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={data.user.username}
                secondary={
                  data.school_graduation_year
                    ? `Batch of ${data.school_graduation_year}`
                    : null
                }
              />
              <ListItemText primary={data.phone_number} />
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};

export default DashboardUsers;
