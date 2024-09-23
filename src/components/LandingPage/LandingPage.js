import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import HeroBanner from "./Component/Content/HeroBanner";
import AboutUs from "./Component/Content/AboutUs";
import Achievements from "./Component/Content/Achievements";
import Testimonials from "./Component/Content/Testimonials";
import ContactUs from "./Component/ContactUs/ContactUs";
import ajaxCall from "../helpers/ajaxCall";
import Events from "./Component/Content/Events";
import Committee from "./Component/Content/Committee";
import Initiatives from "./Component/Content/Initiatives";

const LandingPage = () => {
  const [aboutusData, setAboutusData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [InitiativesData, setInitiativesData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

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
      <div id="achievements">
        <Achievements achievements={achievements} />
      </div>
      <div id="committee">
        <Committee committeeData={committeeData} />
      </div>
      <div id="testimonials">
        <Testimonials testimonialsData={testimonialsData} />
      </div>
      <div id="contact-us">
        <ContactUs />
      </div>
    </>
  );
};

export default LandingPage;
