import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  styled,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
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

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
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
        fetchData("gallery/gallerylistview", setGalleryData),
        fetchData("website/hero-images/", setHeroImages),
        fetchData("gallery/category/list/gallery/", setCategories),
      ]);
    };
    fetchAllData();
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredImages = galleryData.images
    ? galleryData.images.filter((item) =>
        selectedCategory === "all"
          ? true
          : item.category.some((cat) => cat.id === selectedCategory)
      )
    : [];

  return (
    <>
      <HeroBanner heroImages={heroImages} />
      <Container sx={{ mt: 4 }}>
        <SectionTitle variant="h4">Gallery</SectionTitle>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            aria-label="gallery categories"
          >
            <Tab label="All" value="all" />
            {categories.map((category) => (
              <Tab
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Tabs>
        </Box>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {filteredImages.map((item) => (
            <Card
              key={item.id}
              sx={{
                width: "300px",
                borderRadius: 4,
                boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
                margin: "8px",
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.text}
                sx={{
                  objectFit: "cover",
                  height: 250,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ color: "black" }}
                >
                  {item.text}
                </Typography>
                {item.category &&
                  item.category.map((cat) => (
                    <Typography
                      key={cat.id}
                      variant="body2"
                      sx={{ color: "gray" }}
                    >
                      {cat.name}
                    </Typography>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Gallery;
