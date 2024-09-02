import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BAA
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Event</Button>
          <Button color="inherit">Gallery</Button>
          <Button color="inherit">Blog</Button>
          <Button color="inherit">Committee</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">FAQ</Button>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
