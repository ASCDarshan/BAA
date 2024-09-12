import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const AddEvents = () => {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "",
    start_date: "",
    end_date: "",
    total_funds_required: "",
    funds_deadline: "",
    status: "",
    current_funds: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("purpose", formData.purpose);
    formDataToSend.append("start_date", formData.start_date);
    formDataToSend.append("end_date", formData.end_date);
    formDataToSend.append(
      "total_funds_required",
      formData.total_funds_required
    );
    formDataToSend.append("funds_deadline", formData.funds_deadline);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("current_funds", formData.current_funds);
    formDataToSend.append("created_at", formData.created_at);
    formDataToSend.append("updated_at", formData.updated_at);

    try {
      const response = await ajaxCall(
        `initiatives/initiatives/`,
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
      <Typography variant="h5">Add Initiatives</Typography>
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
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="purpose-label">Status</InputLabel>
              <Select
                labelId="purpose-label"
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Status"
              >
                <MenuItem value="PLANNED">Planned</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
              </Select>
            </FormControl>
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
              label="Deadline of Funds Requirement"
              name="funds_deadline"
              type="date"
              value={formData.funds_deadline}
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Total Funds Required"
              name="total_funds_required"
              type="number"
              value={formData.total_funds_required}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Registration Deadline"
              name="status"
              type="date"
              value={formData.status}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
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
        </Grid>
      </form>
    </Container>
  );
};

export default AddEvents;
