import { Container, styled, Typography } from "@mui/material";
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
const ContactUs = (props) => {
  const ContactData = props.ContactData;
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Contact Us</SectionTitle>
      <Typography variant="body1">
        Email: {ContactData.email}
        <br />
        Phone: {ContactData.phone}
        <br />
        Address:{ContactData.address}
      </Typography>
    </Container>
  );
};

export default ContactUs;
