import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";
import HeroBanner from "../Content/HeroBanner";

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: "bold",
  position: "relative",
  color: "#fba645",
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
  const navigate = useNavigate();

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

  const slugify = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to hyphens
  };

  const handleKnowMore = (eventId, eventName) => {
    navigate(`/events/${slugify(eventName)}/`, { state: eventId });
  };

  return (
    <>
      <HeroBanner heroImages={heroImages} />
      <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Upcoming Events</SectionTitle>
        {eventData.map((event, index) => (
          <Card
            key={index}
            sx={{ mt: 4, boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)" }}
          >
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

                  <Grid item xs={12} container justifyContent="flex-end" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleKnowMore(event.id, event.name)}
                    >
                      Know More
                    </Button>
                  </Grid>
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
