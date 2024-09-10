import {
  Box,
  Container,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";

const FooterLink = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  display: "block",
  marginBottom: theme.spacing(1),
  "&:hover": {
    color: theme.palette.primary.main,
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
        borderTop: `1px solid ${(theme) => theme.palette.divider}`,
      }}
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
              {contactData.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {contactData.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {contactData.phone}
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
        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} {footerData.copyright_text}
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <a
              href={footerData.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 8px" }}
            >
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
            </a>
            <a
              href={footerData.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 8px" }}
            >
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
            </a>
            <a
              href={footerData.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: "0 8px" }}
            >
              <IconButton color="inherit" aria-label="LinkedIn">
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
