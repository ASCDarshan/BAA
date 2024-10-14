import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";
import HeroBanner from "../Content/HeroBanner";
import { useLocation } from "react-router-dom";

const EventData = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const location = useLocation();
  const eventId = location.state;
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour12}:${minute} ${ampm}`;
  };

  const handleRegistrations = () => {
    navigate("/login");
  };

  const handleShareEvent = (name, description) => {
    const currentUrl = window.location.href;
    const message = `${name}\n ${description}  \nCheck out this event : ${currentUrl}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `whatsapp://send?text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const BackgroundImage = styled("div")(({ bgImage }) => ({
    width: "100%",
    height: "400px",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }));

  return (
    <>
      <HeroBanner heroImages={heroImages} />
      <Container sx={{ mt: 1 }}>
        {Event.map((event, index) => (
          <Card
            key={index}
            sx={{ mt: 4, boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)" }}
          >
            <Grid container>
              <Grid item xs={12}>
                <BackgroundImage bgImage={event.event_banner} />
              </Grid>
            </Grid>

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
                    At {formatTime(event.start_time)} to{" "}
                    {formatTime(event.end_time)}
                    <br />
                    Starts from {formatDate(event.start_date)} to{" "}
                    {formatDate(event.end_date)}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "250px",
                  marginTop: 6,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "80%",
                    width: "80%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
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
                        Event Schedule:
                      </Typography>
                      {event.subevents.map((subevent, subIndex) => (
                        <div key={subIndex}>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ mb: 2 }}
                          >
                            <Typography variant="h6">
                              {subevent.name} ({formatDate(subevent.date)})
                            </Typography>
                          </Grid>

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
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              mt={2}
              mb={3}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleRegistrations}
                sx={{ mr: 2 }}
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleShareEvent(event.name, event.description)}
                sx={{ mr: 2 }}
              >
                Share Event
              </Button>
            </Grid>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default EventData;
