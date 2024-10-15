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
import React, { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import HeroBanner from "../Content/HeroBanner";

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

const Blogs = () => {
  const [blogData, setblogData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const navigate = useNavigate();

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData("blog/bloglistsview", setblogData),
        fetchData("website/hero-images/", setHeroImages),
      ]);
    };

    fetchAllData();
  }, []);

  if (!blogData || blogData.length === 0) {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <SectionTitle variant="h4">Blogs</SectionTitle>
        <Typography variant="body1">
          No Blogs available at the moment.
        </Typography>
      </Container>
    );
  }

  const handleKnowMore = (BlogId) => {
    navigate(`/Blogs/${BlogId}`);
  };

  return (
    <>
      <HeroBanner heroImages={heroImages} />
      <Container sx={{ mt: 4, mb: 4 }}>
        <SectionTitle variant="h4">Blogs</SectionTitle>
        <Grid container spacing={3}>
          {blogData.map((Blog, index) => (
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
                  image={Blog.image}
                  alt={Blog.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {Blog.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {Blog.text.split(" ").slice(0, 20).join(" ")}...
                  </Typography>
                </CardContent>
                <Grid item xs={12} container justifyContent="center" mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleKnowMore(Blog.id)}
                  >
                    More
                  </Button>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Blogs;
