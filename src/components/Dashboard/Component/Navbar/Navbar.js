import React, { useState } from "react";
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
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../../../images/BAA.png";

const Navbar = ({ onDrawerToggle, userProfileData }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const loggedInUserId = loginInfo?.userId;

  const loggedInUser = userProfileData?.find(
    (userProfile) => userProfile.user?.id === loggedInUserId
  );

  const username = loggedInUser?.user?.username || "Guest";

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleMenuClose();
    navigate("/userProfile");
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("loginInfo");
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Toolbar>
        {isSmallScreen && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box component="img" src={LogoImg} alt="BAA Logo" sx={{ height: 40 }} />

        <Box display="flex" alignItems="center">
          <IconButton onClick={handleAvatarClick}>
            <Avatar>{username.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
          <Typography variant="body1">{username}</Typography>
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
          <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
