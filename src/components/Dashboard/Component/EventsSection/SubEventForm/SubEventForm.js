import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

const SubEventForm = ({ onSubmit }) => {
  const [subEventData, setSubEventData] = useState({
    name: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    max_participants: "",
    qr_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubEventData((prevData) => ({
      ...prevData,
      qr_code: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(subEventData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Sub Event Name"
            name="name"
            value={subEventData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={subEventData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={subEventData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Start Time"
            name="start_time"
            type="time"
            value={subEventData.start_time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="End Time"
            name="end_time"
            type="time"
            value={subEventData.end_time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={subEventData.location}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Max Participants"
            name="max_participants"
            type="number"
            value={subEventData.max_participants}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="QR Code"
            name="qr_code"
            type="file"
            onChange={handleFileChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit Sub Event
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SubEventForm;
