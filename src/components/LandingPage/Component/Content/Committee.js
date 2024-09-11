import React, { useState } from "react";
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
  Grid,
  styled,
  Typography,
  Box,
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
  const [visibleCount, setVisibleCount] = useState(3); // Show only 3 initially

  const handleClickOpen = (member) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewMore = () => {
    setVisibleCount(visibleCount + 3);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <SectionTitle variant="h4">Committee</SectionTitle>
      <Grid container spacing={3}>
        {committeeData.slice(0, visibleCount).map((member, index) => (
          <Grid item xs={8} sm={4} key={index}>
            <Card>
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
          </Grid>
        ))}
      </Grid>

      {visibleCount < committeeData.length && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={handleViewMore}>
            View More
          </Button>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedMember?.name}</DialogTitle>
        <DialogContent>
          <Typography>{selectedMember?.description}</Typography>
        </DialogContent>
        <DialogContent>
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
