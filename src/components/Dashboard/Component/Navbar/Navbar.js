import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";

const Navbar = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [userProfileData, setUserProfileData] = useState([]);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;
  const username = userProfileData?.user?.username || "Guest";

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleMenuClose();
    navigate("/dashboard/userProfile");
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("loginInfo");
    navigate("/login");
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
    fetchData(`profiles/user-profile/user/${userID}/`, setUserProfileData);
  }, [userID]);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {isSmallScreen && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          component="img"
          src={
            "https://bhavansalumniassociation.org/static/media/BAA.5bd3ecf42590eda7df8e.png"
          }
          alt="BAA Logo"
          sx={{ height: 60 }}
          ml={7}
        />

        <Box display="flex" alignItems="center" mr={4}>
          <IconButton onClick={handleAvatarClick}>
            <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
          <Typography
            variant="body1"
            sx={{ ml: 1, cursor: "pointer" }}
            onClick={handleAvatarClick}
          >
            {username}
          </Typography>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              "& .MuiMenuItem-root": {
                display: "flex",
                justifyContent: "space-between",
              },
            },
          }}
        >
          <MenuItem>Alumni Number : {userID}</MenuItem>
          <MenuItem onClick={handleViewProfile}>
            <AccountCircleIcon sx={{ mr: 1 }} />
            <Typography>View Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
