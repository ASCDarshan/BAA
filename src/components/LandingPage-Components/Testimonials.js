import {
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

const Testimonials = (props) => {
  const testimonialsData = props.testimonialsData;
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Testimonials</SectionTitle>
      <Grid container spacing={3}>
        {testimonialsData.map((testimonials, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              {testimonials.image ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={testimonials.image}
                  alt={testimonials.title}
                />
              ) : (
                ""
              )}
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {testimonials.name} - {testimonials.graduation_year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {testimonials.testimonial}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Testimonials;
