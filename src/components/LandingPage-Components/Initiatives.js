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
import React from "react";

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
const Initiatives = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Upcoming Event</SectionTitle>
      <Card>
        <Grid container>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="100%"
              image="https://source.unsplash.com/random/400x300/?event"
              alt="Upcoming Event"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Bhavans Alumni Mega Reunion - Jan 2024
              </Typography>
              <Typography variant="body1" paragraph>
                The Bhavans Alumni Reunion 2024 is a grand get-together that
                aims to bring together former students from different batches,
                spanning over decades of academic excellence. This event will
                serve as a remarkable platform to honor the achievements of our
                esteemed alumni and provide them with an opportunity to
                reconnect with old friends, teachers, and mentors.
              </Typography>
              <Button variant="contained" color="primary">
                Know More
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Initiatives;
