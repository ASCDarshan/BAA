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

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
});

const AboutUs = (props) => {
  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">About Us</SectionTitle>
      {props.aboutusData ? (
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
              <StyledCard>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.author}
                  </Typography>
                </CardContent>
              </StyledCard>
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
