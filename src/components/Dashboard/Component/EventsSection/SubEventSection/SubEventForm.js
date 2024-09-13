import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  createTheme,
} from "@mui/material";

import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
  },
});

const SubEventForm = () => {
  const [eventData, setEventData] = useState([]); // Initialize as an array
  const [subEventData, setSubEventData] = useState({
    name: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    max_participants: "",
    qr_code: "",
    main_event: "",
  });

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
        setData(response?.data || []); // Ensure that we handle empty data
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData("events/events/", setEventData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubEventData((prevFormData) => ({
      ...prevFormData,
      qr_code: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", subEventData.name);
    formDataToSend.append("description", subEventData.description);
    formDataToSend.append("date", subEventData.date);
    formDataToSend.append("start_time", subEventData.start_time);
    formDataToSend.append("end_time", subEventData.end_time);
    formDataToSend.append("location", subEventData.location);
    formDataToSend.append("max_participants", subEventData.max_participants);
    formDataToSend.append("qr_code", subEventData.qr_code);
    formDataToSend.append("main_event", subEventData.main_event);

    try {
      const response = await ajaxCall(
        `events/subevents/`,
        {
          method: "POST",
          body: formDataToSend,
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Event Created Successfully");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Box>
        <Paper
          elevation={3}
          sx={{ p: 3, backgroundColor: theme.palette.background.paper }}
        >
          <Typography variant="h5">Add Subevent</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel id="purpose-label">Event</InputLabel>
                  <Select
                    labelId="purpose-label"
                    name="main_event" // Correct field name
                    value={subEventData.main_event}
                    onChange={handleChange}
                    label="Event"
                  >
                    {eventData.map((event, index) => (
                      <MenuItem key={index} value={event.id}>
                        {event.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Name"
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  type="text"
                  value={subEventData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="QR Code"
                  name="qr_code"
                  type="file"
                  onChange={handleFileChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SubEventForm;
