import React, { useState } from "react";
import Slider from "react-slick";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
  Typography,
  Box,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";

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

const Committee = ({ committeeData }) => {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleClickOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Committee</SectionTitle>

      <Slider {...sliderSettings}>
        {committeeData.map((member, index) => (
          <div key={index}>
            <Card
              sx={{
                mx: 2,
                borderRadius: 4,
                background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
              }}
            >
              <CardMedia
                component="img"
                image={member.image}
                alt={member.title}
                sx={{
                  objectFit: "cover",
                  height: 370,
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
                <Typography gutterBottom variant="h5" component="div">
                  {member.name}
                </Typography>
                <Typography color="black" sx={{ color: "black" }}>
                  {member.designation}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleClickOpen(member)}
                  sx={{
                    mt: 2,
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                  size="small"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>

      {/* Dialog for selected member */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "white",

            color: "black",
            fontWeight: "bold",
            textAlign: "start",
          }}
        >
          {selectedMember?.name}
        </DialogTitle>
        <DialogContent>
          <Typography>{selectedMember?.description}</Typography>
          {selectedMember?.phone && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, color: "#fda085" }} />
              <Typography variant="body2" color="text.primary">
                {selectedMember.phone}
              </Typography>
            </Box>
          )}
          {selectedMember?.email && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <EmailIcon sx={{ mr: 1, color: "#fda085" }} />
              <Typography variant="body2" color="text.primary">
                {selectedMember.email}
              </Typography>
            </Box>
          )}
          {selectedMember?.websites && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LanguageIcon sx={{ mr: 1, color: "#fda085" }} />
              <Typography variant="body2" color="text.primary">
                {selectedMember.websites}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Committee;
