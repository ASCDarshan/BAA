import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
  Event as EventIcon,
  Description as ResourcesIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Groups3Icon from "@mui/icons-material/Groups3";
import { createTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

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

const menuItems = [
  { text: "Home", icon: <HomeIcon />, link: "/dashboard" },
  { text: "Events", icon: <EventIcon />, link: "/dashboard/addEvents" },
  {
    text: "Initiatives",
    icon: <ResourcesIcon />,
    link: "/dashboard/addInitiatives",
  },
  {
    text: "Batchmates",
    icon: <Groups3Icon />,
    link: "/dashboard/batchmates",
  },
  {
    text: "Following Posts",
    icon: <PeopleIcon />,
    link: "/dashboard/followingPost",
  },
  {
    text: "Profile",
    icon: <AccountCircleIcon />,
    link: "/dashboard/userProfile",
  },
];

const Sidebar = ({ drawerOpen, handleDrawerToggle }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginInfo");
    navigate("/login");
  };

  return (
    <>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? drawerOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.link}
              onClick={isSmallScreen ? handleDrawerToggle : null}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem
            button
            key="logout"
            onClick={() => {
              handleLogout();
              if (isSmallScreen) handleDrawerToggle();
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
