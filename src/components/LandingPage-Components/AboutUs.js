import {
  Card,
  CardContent,
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

const AboutUs = (props) => {
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">About Us</SectionTitle>
      {/* <Card>
        <Grid container>
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="100%"
              image="https://source.unsplash.com/random/400x300/?event"
              alt="Upcoming Event"
            />
          </Grid>
        </Grid>
      </Card> */}
      <Grid container spacing={3}>
        {[
          {
            author: props.aboutusData.mission,
            title: "Mission",
          },
          {
            title: "Vision",
            author: props.aboutusData.vision,
          },
          {
            title: "History",
            author: props.aboutusData.history,
          },
        ].map((post, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;
