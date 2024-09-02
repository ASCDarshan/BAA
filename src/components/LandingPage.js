import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import HeroBanner from "./LandingPage-Components/HeroBanner";
import AboutUs from "./LandingPage-Components/AboutUs";
import Achievements from "./LandingPage-Components/Achievements";
import Testimonials from "./LandingPage-Components/Testimonials";
import ContactUs from "./LandingPage-Components/ContactUs";
import Initiatives from "./LandingPage-Components/Initiatives";
import ajaxCall from "../components/helpers/ajaxCall";
import Footers from "./LandingPage-Components/Footers";

// Assume we have a hero image in our public folder
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10px",
    left: 0,
    width: "50px",
    height: "3px",
    backgroundColor: theme.palette.primary.main,
  },
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const LandingPage = () => {
  const [aboutusData, setAboutusData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [ContactData, setContactData] = useState([]);
  const [footerData, setFooterData] = useState([]);
  const [eventsData, setEventsData] = useState([]);

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
  }, []);

  useEffect(() => {
    fetchData("website/about-us/", setAboutusData);
  }, []);

  useEffect(() => {
    fetchData("website/achievements/", setAchievements);
  }, []);

  useEffect(() => {
    fetchData("website/testimonials/", setTestimonialsData);
  }, []);

  useEffect(() => {
    fetchData("website/reach-us/", setContactData);
  }, []);

  useEffect(() => {
    fetchData("website/featured-events/", setEventsData);
  }, []);

  useEffect(() => {
    fetchData("website/footer/", setFooterData);
  }, []);

  return (
    <>
      {/* <AppBar position="static" color="transparent" elevation={0}>
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
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </Toolbar>
        </Container>
      </AppBar> */}

      {/* <HeroSection>
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
      </HeroSection> */}
      <HeroBanner heroImages={heroImages} />
      <AboutUs aboutusData={aboutusData} />
      <Achievements Achievements={achievements} />
      <Testimonials testimonialsData={testimonialsData} />
      <Initiatives eventsData={eventsData} />
      <ContactUs ContactData={ContactData} />
      <Footers footerData={footerData} />

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Upcoming Event</SectionTitle>
        <Card>
          <Grid container>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                height="100%"
                image="https://source.unsplash.com/random/400x300/?event"
                alt="Upcoming Event"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Bhavans Alumni Mega Reunion - Jan 2024
                </Typography>
                <Typography variant="body1" paragraph>
                  The Bhavans Alumni Reunion 2024 is a grand get-together that
                  aims to bring together former students from different batches,
                  spanning over decades of academic excellence. This event will
                  serve as a remarkable platform to honor the achievements of
                  our esteemed alumni and provide them with an opportunity to
                  reconnect with old friends, teachers, and mentors.
                </Typography>
                <Button variant="contained" color="primary">
                  Know More
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container> */}

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">About Us</SectionTitle>
        <Typography variant="body1" paragraph>
          The Bhavans Alumni Association is a vibrant community of graduates who
          have passed through the hallowed halls of our institution. Our
          association serves as a bridge between the past and the present,
          connecting generations of alumni and fostering a sense of belonging
          and pride.
        </Typography>
        <Typography variant="body1">
          We are dedicated to supporting our alma mater, nurturing professional
          growth among our members, and contributing to society through various
          initiatives and programs.
        </Typography>
      </Container> */}

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Recent Events</SectionTitle>
        <Grid container spacing={3}>
          {[
            { title: "Annual Gala Dinner", date: "May 15, 2023" },
            { title: "Career Fair", date: "March 22, 2023" },
            { title: "Homecoming Weekend", date: "October 8-10, 2022" },
          ].map((event, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://source.unsplash.com/random/400x300/?event&sig=${index}`}
                  alt={event.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Gallery</SectionTitle>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={6} sm={4} md={2} key={item}>
              <img
                src={`https://source.unsplash.com/random/300x300/?university&sig=${item}`}
                alt={`Gallery item ${item}`}
                style={{ width: "100%", height: "auto", borderRadius: "4px" }}
              />
            </Grid>
          ))}
        </Grid>
      </Container> */}

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Latest Blog Posts</SectionTitle>
        <Grid container spacing={3}>
          {[
            { title: "The Impact of Alumni Networks", author: "Jane Doe" },
            {
              title: "Memories from Bhavans: A Nostalgic Journey",
              author: "John Smith",
            },
            {
              title: "How to Give Back to Your Alma Mater",
              author: "Alice Johnson",
            },
          ].map((post, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    By {post.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container> */}

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Committee Members</SectionTitle>
        <List>
          {[
            { name: "Dr. Rajesh Patel", position: "President" },
            { name: "Mrs. Priya Sharma", position: "Vice President" },
            { name: "Mr. Amit Desai", position: "Secretary" },
          ].map((member, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={`https://i.pravatar.cc/150?img=${index + 1}`} />
              </ListItemAvatar>
              <ListItemText primary={member.name} secondary={member.position} />
            </ListItem>
          ))}
        </List>
      </Container> */}

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Contact Us</SectionTitle>
        <Typography variant="body1">
          Email: contact@bhavansalumni.org
          <br />
          Phone: +91 1234567890
          <br />
          Address: 123 Alumni Lane, Vadodara, Gujarat, India
        </Typography>
      </Container> */}

      {/* <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">FAQ</SectionTitle>
        <Typography variant="h6">
          How can I join the alumni association?
        </Typography>
        <Typography variant="body1" paragraph>
          All graduates of Bhavans are automatically members of the alumni
          association. To activate your membership and access all benefits,
          please register on our website.
        </Typography>
        <Typography variant="h6">
          How can I update my contact information?
        </Typography>
        <Typography variant="body1">
          You can update your contact information by logging into your account
          on our website and navigating to the profile section.
        </Typography>
      </Container> */}

      {/* <Box
        component="footer"
        sx={{ bgcolor: "background.paper", py: 6, mt: 4 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bhavans Alumni Association is dedicated to fostering lifelong
                connections among alumni, supporting current students, and
                promoting the welfare of our alma mater.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                123 Alumni Lane, Vadodara, Gujarat, India
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: contact@bhavansalumni.org
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +91 1234567890
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Quick Links
              </Typography>
              <FooterLink variant="body2" color="text.secondary">
                Home
              </FooterLink>
              <FooterLink variant="body2" color="text.secondary">
                Events
              </FooterLink>
              <FooterLink variant="body2" color="text.secondary">
                Gallery
              </FooterLink>
              <FooterLink variant="body2" color="text.secondary">
                Donate
              </FooterLink>
              <FooterLink
                variant="body2"
                color="text.secondary"
                component={Link}
                to="/login"
              >
                Login
              </FooterLink>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Bhavans Alumni Association. All
              rights reserved.
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box> */}
    </>
  );
};

export default LandingPage;
