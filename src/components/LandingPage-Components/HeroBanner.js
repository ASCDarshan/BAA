import { Box, Button, Container, styled, Typography } from "@mui/material";
import React from "react";

const heroImage = "/hero-image.jpg";
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "600px",
  display: "flex",
  alignItems: "center",
  color: "white",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Dark overlay
  },
}));
const HeroBanner = () => {
  return (
    <HeroSection>
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          BHAVANS ALUMNI ASSOCIATION
        </Typography>
        <Typography variant="h5" paragraph>
          To create a global network of Bhavans Alumni united by a shared
          commitment to excellence, compassion, and lifelong learning.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          OUR MISSION
        </Button>
        <Button variant="outlined" color="inherit">
          OUR STORY
        </Button>
      </Container>
    </HeroSection>
  );
};

export default HeroBanner;
