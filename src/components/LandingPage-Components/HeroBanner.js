import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const HeroSection = styled(Box)(() => ({
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
}));

const BackgroundImage = styled("div")(({ bgImage }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
}));

const HeroBanner = ({ heroImages }) => {
  return (
    <>
      {heroImages.map((heroimg, index) => (
        <HeroSection key={index}>
          <BackgroundImage bgImage={heroimg.image} />
          <Container sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              {heroimg.title}
            </Typography>
            <Typography variant="h5" paragraph>
              {heroimg.subtitle}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              OUR MISSION
            </Button>
            <Button variant="outlined" color="inherit">
              OUR STORY
            </Button>
          </Container>
        </HeroSection>
      ))}
    </>
  );
};

export default HeroBanner;
