import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ajaxCall from "../../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";

const DashboardUsers = () => {
  const [userProfileData, setUserProfileData] = useState([]);
  const navigate = useNavigate();

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

  const handleViewAllClick = () => {
    navigate("/dashboard/batchmates");
  };

  return (
    <Paper sx={{ p: 2, boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)" }}>
      <Typography variant="h6" gutterBottom>
        People You May Know
      </Typography>
      <List>
        {userProfileData.slice(0, 3).map((data) => (
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
      <Box textAlign="center" sx={{ mt: 1 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewAllClick}
          size="small"
        >
          <RemoveRedEyeIcon sx={{ mr: 1 }} /> View All
        </Button>
      </Box>
    </Paper>
  );
};

export default DashboardUsers;
