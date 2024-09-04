import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BAA
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemText>
            <Button
              href={"/"}
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
                href={`#${item.to}`}
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
              href={"/login"}
              sx={{ color: "inherit", display: "block", width: "100%" }}
            >
              Login
            </Button>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            BAA
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
              >
                BAA
              </Typography>
            </>
          ) : (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button href={"/"} sx={{ color: "inherit" }}>
                Home
              </Button>
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  href={`#${item.to}`}
                  sx={{ color: "inherit" }}
                >
                  {item.name}
                </Button>
              ))}
              <Button href={"/login"} sx={{ color: "inherit" }}>
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
