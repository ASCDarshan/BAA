import React from "react";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const DashboardInitiatives = ({ initiativesData }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Current Initiatives
      </Typography>
      <List>
        {initiativesData.map((initiative) => (
          <ListItem key={initiative.id}>
            <ListItemText
              primary={initiative.name}
              secondary={initiative.purpose}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DashboardInitiatives;
