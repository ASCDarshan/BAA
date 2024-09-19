import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Paper,
  Box,
  createTheme,
} from "@mui/material";
import { RemoveCircle } from "@mui/icons-material";
import ajaxCall from "../../../helpers/ajaxCall";
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

const AddEvents = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    registration_deadline: "",
    location: "",
    qr_code: null,
    subevents: [
      {
        name: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        location: "",
        max_participants: "",
        qr_code: null,
        main_event: 1,
      },
    ],
  });

  console.log("------SubEvent---", formData);

  const handleMainEventChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      qr_code: file,
    }));
  };

  const handleSubEventChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubevents = [...formData.subevents];
    updatedSubevents[index][name] = value;
    setFormData((prevData) => ({ ...prevData, subevents: updatedSubevents }));
  };

  const handleSubEventFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedSubevents = [...formData.subevents];
    updatedSubevents[index].qr_code = file;
    setFormData((prevData) => ({ ...prevData, subevents: updatedSubevents }));
  };

  const addSubEvent = () => {
    setFormData((prevData) => ({
      ...prevData,
      subevents: [
        ...prevData.subevents,
        {
          name: "",
          description: "",
          date: "",
          start_time: "",
          end_time: "",
          location: "",
          max_participants: "",
          qr_code: null,
          main_event: 1,
        },
      ],
    }));
  };

  const removeSubEvent = (index) => {
    const updatedSubevents = formData.subevents.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, subevents: updatedSubevents }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ajaxCall(
        `events/events/`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
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
          <Typography variant="h5">Add Events</Typography>
          <form onSubmit={handleSubmit}>
            <Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Event Name"
                    name="name"
                    value={formData.name}
                    onChange={handleMainEventChange}
                    size="small"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    type="text"
                    value={formData.location}
                    size="small"
                    onChange={handleMainEventChange}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleMainEventChange}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    size="small"
                    onChange={handleMainEventChange}
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
                    value={formData.start_time}
                    size="small"
                    onChange={handleMainEventChange}
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
                    value={formData.end_time}
                    size="small"
                    onChange={handleMainEventChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    size="small"
                    onChange={handleMainEventChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Registration Deadline"
                    name="registration_deadline"
                    type="datetime-local"
                    value={formData.registration_deadline}
                    size="small"
                    onChange={handleMainEventChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </Grid>

              <Grid mt={2}>
                <Typography variant="h5">Add Sub Events</Typography>
                {/* Sub Event Fields */}
                {formData.subevents.map((subEvent, index) => (
                  <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Sub Event Name"
                        name="name"
                        value={subEvent.name}
                        size="small"
                        onChange={(e) => handleSubEventChange(index, e)}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={subEvent.location}
                        size="small"
                        onChange={(e) => handleSubEventChange(index, e)}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Date"
                        name="date"
                        type="date"
                        value={subEvent.date}
                        size="small"
                        onChange={(e) => handleSubEventChange(index, e)}
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
                        value={subEvent.start_time}
                        size="small"
                        onChange={(e) => handleSubEventChange(index, e)}
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
                        value={subEvent.end_time}
                        size="small"
                        onChange={(e) => handleSubEventChange(index, e)}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Max Participants"
                        name="max_participants"
                        type="number"
                        value={subEvent.max_participants}
                        size="small"
                        onChange={(e) => handleSubEventChange(index, e)}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={subEvent.description}
                        size="small"
                        onChange={(e) => handleSubEventChange(index, e)}
                        multiline
                        rows={4}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                      <IconButton
                        onClick={() => removeSubEvent(index)}
                        color="error"
                      >
                        <RemoveCircle />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} container justifyContent="flex-end">
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={addSubEvent}
                  size="small"
                >
                  Add Sub Event
                </Button>
              </Grid>

              <Grid item xs={12} container justifyContent="flex-end" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Submit Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddEvents;
