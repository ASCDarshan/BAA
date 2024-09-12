import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import SubEventForm from "./SubEventForm/SubEventForm";

const AddEvents = () => {
  const [showSubEventForm, setShowSubEventForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    registration_deadline: "",
    location: "",
    qr_code: "",
    subevents: [
      {
        pricing: [],
        name: "",
        description: "",
        date: "",
        start_time: "",
        end_time: "",
        location: "",
        max_participants: "",
        qr_code: "",
        main_event: 1
      }
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      qr_code: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("start_date", formData.start_date);
    formDataToSend.append("end_date", formData.end_date);
    formDataToSend.append("start_time", formData.start_time);
    formDataToSend.append("end_time", formData.end_time);
    formDataToSend.append(
      "registration_deadline",
      formData.registration_deadline
    );
    formDataToSend.append("location", formData.location);
    formDataToSend.append("qr_code", formData.qr_code);

    try {
      const response = await ajaxCall(
        `events/events/`,
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

  const handleSubEventSubmit = (subEventData) => {
    setFormData((prevData) => ({
      ...prevData,
      subevents: [...prevData.subevents, subEventData],
    }));
    setShowSubEventForm(false);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5">Add Events</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
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
              onChange={handleChange}
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
              value={formData.start_time}
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
              value={formData.end_time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Registration Deadline"
              name="registration_deadline"
              type="datetime-local"
              value={formData.registration_deadline}
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
              type="text"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="QR Code"
              name="qrCode"
              type="file"
              onChange={handleFileChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="small"
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setShowSubEventForm((prev) => !prev)}
            >
              Sub Events
            </Button>
          </Grid>
        </Grid>
      </form>
      {showSubEventForm && (
        <SubEventForm onSubmit={handleSubEventSubmit} /> // Render SubEventForm on toggle
      )}
    </Container>
  );
};

export default AddEvents;
