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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleKnowMore = (eventId, eventName) => {
    navigate(`/events/${eventName}/`, { state: eventId });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Upcoming Events</SectionTitle>
      {eventsData.map((event, index) => (
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
