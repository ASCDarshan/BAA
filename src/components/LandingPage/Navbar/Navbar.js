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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoImg from "../../../images/BAA.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { name: "About", to: "about-us" },
    { name: "Event", to: "events" },
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
    <AppBar position="fixed" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box
            component="img"
            src={LogoImg}
            alt="BAA Logo"
            sx={{ height: 40 }}
          />
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              <Button href="/" sx={{ color: "inherit" }}>
                Home
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
  );
};

export default Navbar;
