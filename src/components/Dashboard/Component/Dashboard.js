import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Button,
  TextField,
  Chip,
  Tabs,
  Tab,
  Drawer,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Home as HomeIcon,
  Forum as ForumIcon,
  ContactPhone as DirectoryIcon,
  School as MentorshipIcon,
  Work as JobsIcon,
  Event as EventIcon,
  Business as BusinessDirectoryIcon,
  Description as ResourcesIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import MainContent from "./MainContent/MainContent";
import Sidebar from "./SideBar/Sidebar";

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
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Forum", icon: <ForumIcon /> },
    { text: "Directory", icon: <DirectoryIcon /> },
    { text: "Mentorship", icon: <MentorshipIcon /> },
    { text: "Jobs", icon: <JobsIcon /> },
    { text: "Events", icon: <EventIcon /> },
    { text: "Business Directory", icon: <BusinessDirectoryIcon /> },
    { text: "Resources", icon: <ResourcesIcon /> },
    { text: "Log Out", icon: <LogoutIcon /> },
  ];

  const threads = [
    {
      id: 1,
      author: "Hado Kagutsuchi",
      title: "The Future of Freelancers is Promising!",
      content:
        "Freelance work is such a great job. The New Year provides good reasons to be optimistic and to smile, as it projects a positive and stable career future for...",
      time: "32 min ago",
      category: "Freelance",
      likes: 56,
      comments: 16,
    },
    {
      id: 2,
      author: "Mulan Fang",
      title: "Why Do I Get Bored with Jobs Easily?",
      content:
        "Psychologists say monotony is one the most common causes of boredom. Often times our natural response to monotony is to seek external stimulation—we...",
      time: "48 min ago",
      category: "Career",
      likes: 48,
      comments: 32,
    },
    {
      id: 3,
      author: "Ameer Black Mamba",
      title: "Burnout Prevention and Treatment",
      content:
        "If constant stress has you feeling helpless, disillusioned, and completely exhausted, you may be on the road to burnout. Learn what you can do to regain your...",
      time: "1 hour ago",
      category: "Tips",
      likes: 0,
      comments: 0,
    },
  ];

  const recommendedTopics = [
    "Freelance",
    "Productivity",
    "Business",
    "Psychology",
    "Tips",
    "Mindfulness",
  ];

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
        <Navbar />
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
          threads={threads}
          recommendedTopics={recommendedTopics}
          events={events}
          initiatives={initiatives}
          suggestedAlumni={suggestedAlumni}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
