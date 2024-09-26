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
} from "@mui/material";

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
            <Card sx={{ mx: 2 }}>
              <CardMedia
                component="img"
                image={member.image}
                alt={member.title}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {member.name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {member.designation}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleClickOpen(member)}
                  sx={{ mt: 2 }}
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
        <DialogTitle>{selectedMember?.name}</DialogTitle>
        <DialogContent>
          <Typography>{selectedMember?.description}</Typography>
          {selectedMember?.phone && (
            <Typography>Contact: {selectedMember.phone}</Typography>
          )}
          {selectedMember?.email && (
            <Typography>Email: {selectedMember.email}</Typography>
          )}
          {selectedMember?.websites && (
            <Typography>Website: {selectedMember.websites}</Typography>
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
