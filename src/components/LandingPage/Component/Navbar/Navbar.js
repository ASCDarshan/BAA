import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ContactMailIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import LoginIcon from "@mui/icons-material/Person";
import LogoImg from "../../../images/BAA.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { name: "About", to: "about-us" },
    { name: "Achievements", to: "achievements" },
    { name: "Committee", to: "committee" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact-us" },
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        <ListItem disablePadding>
          <ListItemText>
            <Button
              onClick={() => scrollToSection("hero-banner")}
              sx={{ color: "inherit", display: "block", width: "100%" }}
            >
              Home
            </Button>
          </ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>
            <Button
              href="/events"
              sx={{
                color: "inherit",
                display: "block",
                width: "100%",
                textAlign: "center",
              }}
            >
              Event
            </Button>
          </ListItemText>
        </ListItem>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemText>
              <Button
                onClick={() => scrollToSection(item.to)}
                sx={{ color: "inherit", display: "block", width: "100%" }}
              >
                {item.name}
              </Button>
            </ListItemText>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemText>
            <Button
              href="/login"
              sx={{
                color: "inherit",
                display: "block",
                width: "100%",
                textAlign: "center",
              }}
            >
              Login
            </Button>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={LogoImg}
              alt="BAA Logo"
              sx={{
                height: isMobile ? 40 : 110,
                position: "absolute",
                top: "10px",
                left: "20px",
                zIndex: 1,
                opacity: isMobile ? 1 : 0.8,
                pointerEvents: "none",
                backgroundColor: isMobile
                  ? "transparent"
                  : "rgba(255, 255, 255, 0.5)",
                borderRadius: "8px",
                padding: isMobile ? "0" : "8px",
              }}
            />

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  ml: "auto",
                }}
              >
                <Button href="/" sx={{ color: "inherit" }}>
                  Home
                </Button>
                <Button href="/events" sx={{ color: "inherit" }}>
                  Event
                </Button>
                {menuItems.map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => scrollToSection(item.to)}
                    sx={{ color: "inherit" }}
                  >
                    {item.name}
                  </Button>
                ))}
                <Button href="/login" sx={{ color: "inherit" }}>
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>

      {isMobile && (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue === 0) {
              navigate("/");
            } else if (newValue === 1) {
              navigate("/events");
            } else if (newValue === 2) {
              scrollToSection("contact-us");
            } else if (newValue === 3) {
              navigate("/login");
            }
          }}
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            zIndex: 1200,
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Event" icon={<EventIcon />} />
          <BottomNavigationAction label="Contact" icon={<ContactMailIcon />} />
          <BottomNavigationAction label="Login" icon={<LoginIcon />} />
        </BottomNavigation>
      )}
    </>
  );
};

export default Navbar;
