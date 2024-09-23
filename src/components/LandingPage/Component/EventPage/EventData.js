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
import { useNavigate, useParams } from "react-router-dom";
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

const EventData = () => {
  const [eventData, setEventData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const { eventId } = useParams();

  const Event = eventData.filter((item) => item.id == eventId);

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
        {Event.map((event, index) => (
          <Card key={index} sx={{ mt: 4 }}>
            <Grid container>
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
              <Grid item xs={12} md={4}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={event.qr_code}
                  alt={event.title || "Upcoming Event"}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={8}>
                <CardContent>
                  {event.subevents?.length > 0 && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Sub-events:
                      </Typography>
                      {event.subevents.map((subevent, subIndex) => (
                        <div key={subIndex}>
                          <Typography variant="h6">
                            {subevent.name} ({subevent.date})
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {subevent.description}
                          </Typography>
                          <Typography variant="body2">
                            Time: {formatTime(subevent.start_time)} -{" "}
                            {formatTime(subevent.end_time)}
                          </Typography>
                          <Typography variant="body2">
                            Location: {subevent.location || "To be announced"}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            Max Participants: {subevent.max_participants}
                          </Typography>

                          {/* Display Pricing */}
                          {subevent.pricing?.length > 0 && (
                            <>
                              <Typography variant="h6" gutterBottom>
                                Pricing:
                              </Typography>
                              {subevent.pricing.map((price, priceIndex) => (
                                <div key={priceIndex}>
                                  <Typography variant="body2">
                                    Alumni Price: {price.alumni_price}
                                  </Typography>
                                  <Typography variant="body2">
                                    Guest Price: {price.guest_price}
                                  </Typography>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default EventData;
