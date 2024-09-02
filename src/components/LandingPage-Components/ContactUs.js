import { Container, Grid, styled, Typography } from "@mui/material";
import React from "react";

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

const StyledIframe = styled("iframe")(({ theme }) => ({
  border: 0,
  width: "100%",
  height: "300px",
  [theme.breakpoints.up('md')]: {
    height: "400px",
  },
  borderRadius: theme.shape.borderRadius,
}));

const ContactUs = (props) => {
  const ContactData = props.ContactData;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <SectionTitle variant="h4">Contact Us</SectionTitle>
          <Typography variant="body1">
            Email: {ContactData.email}
            <br />
            Phone: {ContactData.phone}
            <br />
            Address: {ContactData.address}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledIframe
            src={ContactData.google_map_embed}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
