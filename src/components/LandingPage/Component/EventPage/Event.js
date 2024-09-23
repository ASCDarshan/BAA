import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
import HeroBanner from "../Content/HeroBanner";

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

const Event = () => {
  const [eventData, setEventData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);

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
    fetchData("events/events/", setEventData);
    fetchData("website/hero-images/", setHeroImages);
  }, []);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };
  return (
    <>
      <HeroBanner heroImages={heroImages} />
      <Container sx={{ mt: 1 }}>
        <SectionTitle variant="h4">Upcoming Events</SectionTitle>
        {eventData.map((event, index) => (
          <Card key={index} sx={{ mt: 4 }}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={event.qr_code}
                  alt={event.title || "Upcoming Event"}
                />
              </Grid>
              <Grid item xs={12} md={8} mt={4}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {event.description}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Starts from {event.start_date} to {event.end_date} <br />
                    At {formatTime(event.start_time)} to{" "}
                    {formatTime(event.end_time)}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Event;
