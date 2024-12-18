import React from "react";
import { useNavigate } from "react-router-dom";
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

const Events = ({ eventsData }) => {
  const navigate = useNavigate();

  const slugify = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  const handleKnowMore = (eventId, eventName) => {
    navigate(`/events/${slugify(eventName)}/`, { state: eventId });
  };

  if (!eventsData || eventsData.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Card
          sx={{ mt: 4, boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)", p: 2 }}
        >
          <Grid container>
            <Grid item xs={12} md={4}>
              <div className="mt-16 container mx-auto px-4 p-2 m-2">
                <p className="text-gray-600">
                  Currently, there are no upcoming events.
                </p>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Upcoming Events</SectionTitle>
      {eventsData.map((event, index) => (
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
  );
};

export default Events;
