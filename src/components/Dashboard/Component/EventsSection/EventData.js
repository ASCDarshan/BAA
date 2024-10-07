import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
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

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box>
        <Breadcrumb title="Event" main="Dashboard" />
        <Paper
          elevation={3}
          sx={{ backgroundColor: theme.palette.background.paper, mt: 2, p: 2 }}
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
                      Starts from {formatDate(selectedEvent.start_date)} to{" "}
                      {formatDate(selectedEvent.end_date)}
                      <br />
                      Time: {formatTime(selectedEvent.start_time)} -{" "}
                      {formatTime(selectedEvent.end_time)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={selectedEvent.qr_code}
                      alt={selectedEvent.title || "Upcoming Event"}
                      sx={{ borderRadius: 2 }}
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
              </>
            )}
          </CardContent>
        </Paper>
      </Box>
    </Container>
  );
};

export default EventData;
