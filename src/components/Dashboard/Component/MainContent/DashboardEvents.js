import React from "react";
import { Paper, Typography, List, ListItemText } from "@mui/material";

const DashboardEvents = ({ eventsData }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upcoming Events
      </Typography>
      <List>
        {eventsData.map((event) => (
          <ListItemText
            key={event.id}
            primary={event.name}
            secondary={`${event.start_date} to ${event.end_date}`}
          />
        ))}
      </List>
    </Paper>
  );
};

export default DashboardEvents;
