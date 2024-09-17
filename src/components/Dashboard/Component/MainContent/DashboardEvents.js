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
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const steps = [
  "Event Registration",
  "Sub Event Registration",
  "Accompanying guests",
];

const DashboardEvents = ({ eventsData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    setFormData({ name: "", email: "" });
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleReset = () => setActiveStep(0);

  //for register
  const [data, setData] = useState({
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
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      profile_picture: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("purpose", data.purpose);

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
  // end registration

  const isStepComplete = () => activeStep === steps.length - 1;

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
                onClick={handleOpenDialog}
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
          <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">
                All steps completed - you’re finished!
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 2 }}>
                Reset
              </Button>
            </Box>
          ) : (
            <>
              <form>
                {activeStep === 0 && (
                  <Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Event Name"
                          name="name"
                          value={formData.name}
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Alumni"
                          name="location"
                          type="text"
                          value={formData.location}
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Total Amount"
                          name="start_date"
                          type="number"
                          value={formData.start_date}
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Payment status"
                          name="end_date"
                          type="text"
                          value={formData.end_date}
                          required
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {activeStep === 1 && (
                  <Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Subevent"
                          name="name"
                          value={formData.name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Num guests"
                          name="location"
                          type="text"
                          value={formData.location}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Amount paid"
                          name="start_date"
                          type="number"
                          value={formData.start_date}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {activeStep === 2 && (
                  <Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="location"
                          type="number"
                          value={formData.location}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Image"
                          name="start_date"
                          type="file"
                          value={formData.start_date}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </form>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={activeStep === 0}
                  size="small"
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  size="small"
                >
                  {isStepComplete() ? "Submit" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardEvents;
