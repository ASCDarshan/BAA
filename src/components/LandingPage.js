import React, { useEffect, useState } from "react";

import HeroBanner from "./LandingPage-Components/HeroBanner";
import AboutUs from "./LandingPage-Components/AboutUs";
import Achievements from "./LandingPage-Components/Achievements";
import Testimonials from "./LandingPage-Components/Testimonials";
import ContactUs from "./LandingPage-Components/ContactUs";
import ajaxCall from "../components/helpers/ajaxCall";
import Footers from "./LandingPage-Components/Footers";
import Events from "./LandingPage-Components/Events";
import Committee from "./LandingPage-Components/Committee";

const LandingPage = () => {
  const [aboutusData, setAboutusData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [footerData, setFooterData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [committeeData, setcommitteeData] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${
            //   JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            // }`,
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
    fetchData("website/hero-images/", setHeroImages);
    fetchData("website/about-us/", setAboutusData);
    fetchData("website/achievements/", setAchievements);
    fetchData("website/testimonials/", setTestimonialsData);
    fetchData("events/events/", setEventsData);
    fetchData("website/footer/", setFooterData);
    fetchData("website/committee", setcommitteeData);
  }, []);

  return (
    <>
      <div id="hero-banner">
        <HeroBanner heroImages={heroImages} />
      </div>
      <div id="about-us">
        <AboutUs aboutusData={aboutusData} />
      </div>
      <div id="committee">
        <Committee committeeData={committeeData} />
      </div>
      <div id="events">
        <Events eventsData={eventsData} />
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
      <div id="footer">
        <Footers footerData={footerData} />
      </div>
    </>
  );
};

export default LandingPage;
