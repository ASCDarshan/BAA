import React from "react";
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

const Events = ({ eventsData }) => {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Upcoming Events</SectionTitle>
      {eventsData.map((event, index) => (
        <Card key={index}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                height="100%"
                image={event.qr_code}
                alt={event.title || "Upcoming Event"}
              />
            </Grid>
            <Grid item xs={12} md={8}>
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
  );
};

export default Events;
