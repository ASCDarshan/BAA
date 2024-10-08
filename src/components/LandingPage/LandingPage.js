import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import HeroBanner from "./Component/Content/HeroBanner";
import AboutUs from "./Component/Content/AboutUs";
import Achievements from "./Component/Content/Achievements";
import Testimonials from "./Component/Content/Testimonials";
import ContactUs from "./Component/ContactUs/ContactUs";
import ajaxCall from "../helpers/ajaxCall";
import Events from "./Component/Content/Events";
import Committee from "./Component/Content/Committee";
import Initiatives from "./Component/Content/Initiatives";
import { useNavigate } from "react-router-dom";
import LogoImg from "../images/BAA.png";

const LandingPage = () => {
  const [aboutusData, setAboutusData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [InitiativesData, setInitiativesData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData("website/hero-images/", setHeroImages),
        fetchData("website/about-us/", setAboutusData),
        fetchData("website/achievements/", setAchievements),
        fetchData("website/testimonials/", setTestimonialsData),
        fetchData("events/events/", setEventsData),
        fetchData("initiatives/initiatives/", setInitiativesData),
        fetchData("website/committee", setCommitteeData),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <img
          src={LogoImg}
          alt="Loading Logo"
          style={{
            width: "100px",
            height: "100px",
            position: "relative",
            zIndex: 1,
          }}
        />
      </Box>
    );
  }

  const handleLifetimeMembershipClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div id="hero-banner">
        <HeroBanner heroImages={heroImages} />
      </div>
      <div id="about-us">
        <AboutUs aboutusData={aboutusData} />
      </div>
      <div id="events">
        <Events eventsData={eventsData} />
      </div>
      <div id="events">
        <Initiatives InitiativesData={InitiativesData} />
      </div>
      <div id="committee">
        <Committee committeeData={committeeData} />
      </div>
      <div id="achievements">
        <Achievements achievements={achievements} />
      </div>
      <div id="testimonials">
        <Testimonials testimonialsData={testimonialsData} />
      </div>
      <div id="contact-us">
        <ContactUs />
      </div>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 4,
          width: "100%",
          textAlign: "right",
          padding: "16px 0",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleLifetimeMembershipClick}
          sx={{
            fontSize: "14px",
            padding: "8px 20px",
            marginRight: "20px", // Added margin-right to position the button with some space from the right side
            borderRadius: "20px", // Rounded corners
            backgroundColor: "#1976d2", // Unique blue color
            color: "#fff", // White text
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Add some shadow for depth
            "&:hover": {
              backgroundColor: "#1565c0", // Darker shade on hover
            },
            transition: "all 0.3s ease", // Smooth transition effect
          }}
        >
          Lifetime Membership
        </Button>
      </Box>
    </>
  );
};

export default LandingPage;
