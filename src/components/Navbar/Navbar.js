import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-scroll";

const Navbar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BAA
          </Typography>
          <Button color="inherit">
            <Link to="hero-banner" smooth={true} duration={500}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="about-us" smooth={true} duration={500}>
              About
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="events" smooth={true} duration={500}>
              Event
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="achievements" smooth={true} duration={500}>
              Achievements
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="testimonials" smooth={true} duration={500}>
              Testimonials
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="committee" smooth={true} duration={500}>
              Committee
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="contact-us" smooth={true} duration={500}>
              Contact
            </Link>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
