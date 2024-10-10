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

const Achievements = (props) => {
  const achievementsData = props.achievements;

  if (!achievementsData || achievementsData.length === 0) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <SectionTitle variant="h4">Achievements</SectionTitle>
        <Typography variant="body1">
          No achievements available at the moment.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <SectionTitle variant="h4">Achievements</SectionTitle>
      <Grid container spacing={3}>
        {achievementsData.map((achievement, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                padding: 2,
                boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={achievement.image}
                alt={achievement.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {achievement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {achievement.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {achievement.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Achievements;
