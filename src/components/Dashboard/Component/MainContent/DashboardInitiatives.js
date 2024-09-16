import React, { useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DashboardInitiatives = ({ initiativesData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : initiativesData.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < initiativesData.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" className="mb-4">
        Current Initiatives
      </Typography>
      {initiativesData.length > 0 && (
        <List>
          <ListItem>
            <ListItemText
              primary={initiativesData[currentIndex].name}
              secondary={initiativesData[currentIndex].purpose}
            />
          </ListItem>
        </List>
      )}
      {initiativesData.length > 1 && (
        <>
          <IconButton
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default DashboardInitiatives;
