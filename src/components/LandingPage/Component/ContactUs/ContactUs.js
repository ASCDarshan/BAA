import {
  Container,
  Grid,
  styled,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";

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
  [theme.breakpoints.up("md")]: {
    height: "400px",
  },
  borderRadius: theme.shape.borderRadius,
}));

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await ajaxCall(
        "website/contact-us",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Post Created Successfully");
        setFormData({ name: "", email: "", address: "", phone: "" });
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <SectionTitle variant="h4">Contact Us</SectionTitle>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={6} md={6} mt={11}>
          <StyledIframe
            src={
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14882.181992377934!2d73.16385965!3d22.33736295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc438ffffffff%3A0x9983a37a832dd134!2sBhavan's%20School%2C%20Vadodara!5e0!3m2!1sen!2sin!4v1694430824557!5m2!1sen!2sin"
            }
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
