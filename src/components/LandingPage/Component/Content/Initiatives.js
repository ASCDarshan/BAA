import React from "react";
import {
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

const Initiatives = ({ InitiativesData }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Initiatives</SectionTitle>
      {InitiativesData.map((event, index) => (
        <Card key={index}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {event.name}
                </Typography>
                <Typography variant="body1" paragraph>
                  {event.purpose}
                </Typography>
                <Typography variant="body1" paragraph>
                  Starts from: {event.start_date} to {event.end_date} <br />
                  Total Funds Required: {event.total_funds_required} <br />
                  Fund Deadline: {event.funds_deadline}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Container>
  );
};

export default Initiatives;
