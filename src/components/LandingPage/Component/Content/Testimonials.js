import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SectionTitle = ({ children }) => (
  <Typography
    variant="h4"
    sx={{
      marginBottom: 4,
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
        backgroundColor: "primary.main",
      },
    }}
  >
    {children}
  </Typography>
);

const TestimonialCard = ({ testimonial }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      margin: 2,
      boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
    }}
  >
    {testimonial.image && (
      <CardMedia
        component="img"
        height="140"
        image={testimonial.image}
        alt={testimonial.name}
      />
    )}
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="div">
        {testimonial.name} - {testimonial.graduation_year}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {testimonial.testimonial}
      </Typography>
    </CardContent>
  </Card>
);

const NextArrow = ({ onClick }) => (
  <ChevronRight
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "-30px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 1,
    }}
  />
);

const PrevArrow = ({ onClick }) => (
  <ChevronLeft
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "-30px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 1,
    }}
  />
);

const Testimonials = ({ testimonialsData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ mt: 4, mb: 6, position: "relative" }}>
      {" "}
      <SectionTitle>Testimonials</SectionTitle>
      {testimonialsData.length > 3 ? (
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} style={{ padding: "0 15px" }}>
              {" "}
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </Slider>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          {testimonialsData.map((testimonial, index) => (
            <div key={index} style={{ flex: 1 }}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Testimonials;
