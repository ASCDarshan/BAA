import React, { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import HeroBanner from "./Component/HeroBanner";
import AboutUs from "./Component/AboutUs";
import Achievements from "./Component/Achievements";
import Testimonials from "./Component/Testimonials";
import ContactUs from "./Component/ContactUs";
import ajaxCall from "../helpers/ajaxCall";
import Footers from "./Component/Footers";
import Events from "./Component/Events";
import Committee from "./Component/Committee";

const LandingPage = () => {
  const [aboutusData, setAboutusData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [footerData, setFooterData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [committeeData, setCommitteeData] = useState([]);
  const [contactData, setContactData] = useState([]);
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
        fetchData("website/footer/", setFooterData),
        fetchData("website/committee", setCommitteeData),
        fetchData("website/reach-us/", setContactData),
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
      <div id="footer">
        <Footers footerData={footerData} contactData={contactData} />
      </div>
    </>
  );
};

export default LandingPage;
