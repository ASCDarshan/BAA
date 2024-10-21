import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ajaxCall from "../../../helpers/ajaxCall";

const FooterLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  display: "block",
  marginBottom: theme.spacing(1),
  "&:hover": {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
  },
}));

const Footers = () => {
  const [footerData, setFooterData] = useState([]);
  const [contactData, setContactData] = useState([]);

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
    Promise.all([
      fetchData("website/footer/", setFooterData),
      fetchData("website/reach-us/", setContactData),
    ]);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        mt: 4,
        mb: 4,
        borderTop: `1px solid ${(theme) => theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.primary">
              Bhavans Alumni Association is dedicated to fostering lifelong
              connections among alumni, supporting current students, and
              promoting the welfare of our alma mater.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.primary">
              {contactData.address}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Email : {contactData.email}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Phone : {contactData.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/events">Events</FooterLink>
            <FooterLink to="/Terms">Terms and Conditions</FooterLink>
            <FooterLink to="/Privacy">Privacy</FooterLink>
            <FooterLink to="/login">Login</FooterLink>
          </Grid>
        </Grid>
        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="text.primary">
            {new Date().getFullYear()} {footerData.copyright_text}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <a
              href={footerData.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 8px" }}
            >
              <IconButton aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
            </a>
            <a
              href={footerData.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 8px" }}
            >
              <IconButton aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </a>
            <a
              href={footerData.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 8px" }}
            >
              <IconButton aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footers;
