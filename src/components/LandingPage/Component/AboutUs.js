import {
  Card,
  CardContent,
  CircularProgress,
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
      {props ? (
        <Grid container spacing={3}>
          {[
            {
              title: "Mission",
              author: props.aboutusData.mission,
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
      ) : (
        <CircularProgress color="inherit" />
      )}
    </Container>
  );
};

export default AboutUs;
