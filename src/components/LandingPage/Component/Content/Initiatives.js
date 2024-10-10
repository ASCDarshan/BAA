import React from "react";
import {
  Card,
  CardContent,
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

const Initiatives = ({ InitiativesData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Initiatives</SectionTitle>
      {InitiativesData.map((event, index) => (
        <Card
          key={index}
          sx={{
            boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
          }}
        >
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
                  Starts from : {formatDate(event.start_date)} to{" "}
                  {formatDate(event.end_date)} <br />
                  Total Funds Required : {event.total_funds_required} <br />
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
