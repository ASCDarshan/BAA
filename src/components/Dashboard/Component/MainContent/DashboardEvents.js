import React, { useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Grid,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const DashboardEvents = ({ eventsData }) => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

  const initialData = {
    registration_date: new Date().toISOString(),
    total_amount: "",
    payment_status: "COMPLETED",
    full_event_access: true,
    event: "",
    alumni: userID,
  };

  const [formData, setFormData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setFormData({
      ...formData,
      total_amount: event.amount || "",
      event: event.id,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialData);
  };

  const handleEventRegistration = async (e) => {
    e.preventDefault();

    const formDataToSend = JSON.stringify(formData);

    try {
      const response = await ajaxCall(
        `events/registrations/`,
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginInfo?.accessToken}`,
          },
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Registration Completed Successfully");
        handleCloseDialog();
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upcoming Events
        </Typography>
        <List>
          {eventsData.map((event) => (
            <ListItem
              key={event.id}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <ListItemText
                primary={event.name}
                secondary={`${event.start_date} to ${event.end_date}`}
              />
              <Button
                variant="contained"
                onClick={() => handleOpenDialog(event)}
                size="small"
              >
                Register
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Register for Event</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEventRegistration}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <TextField
                    label="Event"
                    value={selectedEvent?.name || ""}
                    InputProps={{
                      readOnly: true,
                    }}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  name="total_amount"
                  value={formData.total_amount || ""}
                  InputProps={{
                    readOnly: true,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.full_event_access}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          full_event_access: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Full Event Access"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Pay
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardEvents;
