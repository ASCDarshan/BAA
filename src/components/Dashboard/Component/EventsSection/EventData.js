import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Container,
  CardMedia,
  CircularProgress,
  Divider,
  Paper,
  CardContent,
  Button,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import ajaxCall from "../../../helpers/ajaxCall";
import Breadcrumb from "../../../Ul/Breadcrumb";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
  },
});

const EventData = () => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { eventId } = useParams();

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData("events/events/", setEventData);
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

  const selectedEvent = eventData.find((item) => item.id === Number(eventId));

  const handleRegistrations = () => {
    Navigate("/login");
  };

  const handleShareEvent = () => {
    const currentUrl = window.location.href;
    const message = `Check out this event: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
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
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box>
        <Breadcrumb title="Event" main="Dashboard" />
        <Paper
          elevation={3}
          sx={{
            backgroundColor: theme.palette.background.paper,
            mt: 2,
            p: 2,
            boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
          }}
        >
          <CardContent>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="300px"
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={4}>
                  {/* <Grid container>
                    <Grid item xs={12}>
                      <BackgroundImage bgImage={selectedEvent.qr_code} />
                    </Grid>
                  </Grid> */}
                  <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                      {selectedEvent.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedEvent.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Time: {formatTime(selectedEvent.start_time)} -{" "}
                      {formatTime(selectedEvent.end_time)}
                      <br />
                      Starts from {formatDate(selectedEvent.start_date)} to{" "}
                      {formatDate(selectedEvent.end_date)}
                    </Typography>
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
                      marginTop: 2,
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
                      image={selectedEvent.qr_code}
                      alt={selectedEvent.title || "Upcoming Event"}
                    />
                  </Grid>
                </Grid>

                {selectedEvent.subevents?.length > 0 && (
                  <>
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h5" gutterBottom>
                      Sub-events:
                    </Typography>

                    {selectedEvent.subevents.map((subevent, subIndex) => (
                      <Box key={subIndex} sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                          {subevent.name} ({formatDate(subevent.date)})
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
                            <Typography variant="subtitle1" gutterBottom>
                              Pricing:
                            </Typography>
                            {subevent.pricing.map((price, priceIndex) => (
                              <Box key={priceIndex} sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Alumni Price: {price.alumni_price}
                                </Typography>
                                <Typography variant="body2">
                                  Guest Price: {price.guest_price}
                                </Typography>
                              </Box>
                            ))}
                          </>
                        )}
                      </Box>
                    ))}
                  </>
                )}

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
                    onClick={handleShareEvent}
                    sx={{ mr: 2 }}
                  >
                    Share Event
                  </Button>
                </Grid>
              </>
            )}
          </CardContent>
        </Paper>
      </Box>
    </Container>
  );
};

export default EventData;
