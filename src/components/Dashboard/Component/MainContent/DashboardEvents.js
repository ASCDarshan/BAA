import React, { useEffect, useState } from "react";
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
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import ajaxCall from "../../../helpers/ajaxCall";

const steps = [
  "Event Registration",
  "Sub Event Registration",
  // "Accompanying Guests",
];

const DashboardEvents = ({ eventsData }) => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

  const initialData = {
    registration_date: new Date().toISOString(),
    total_amount: "",
    payment_status: "",
    full_event_access: true,
    event: "",
    alumni: userID,
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [subEvents, setSubEvents] = useState([]);
  const [selectedSubEvents, setSelectedSubEvents] = useState([]);
  const [guestsCount, setGuestsCount] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setSubEvents(event.subevents || []);
    setOpenDialog(true);
    setGuestsCount({});
    setSelectedSubEvents([]);
    setTotalAmount(event.price || 0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    setFormData(initialData);
  };

  const handleSubEventSelection = (subEventId, isChecked) => {
    const updatedSelectedSubEvents = isChecked
      ? [...selectedSubEvents, subEventId]
      : selectedSubEvents.filter((id) => id !== subEventId);
    setSelectedSubEvents(updatedSelectedSubEvents);

    calculateTotalAmount(updatedSelectedSubEvents, guestsCount);
  };

  const handleGuestChange = (subEventId, count) => {
    const updatedGuestsCount = { ...guestsCount, [subEventId]: count };
    setGuestsCount(updatedGuestsCount);

    calculateTotalAmount(selectedSubEvents, updatedGuestsCount);
  };

  const calculateTotalAmount = (selectedSubEvents, guestsCount) => {
    let amount = selectedEvent?.amount || 0;
    selectedSubEvents.forEach((subEventId) => {
      const subEvent = subEvents.find((sub) => sub.id === subEventId);
      const alumniPrice = parseFloat(subEvent.pricing[0].alumni_price);
      const guestPrice = parseFloat(subEvent.pricing[0].guest_price);
      const guestCount = parseInt(guestsCount[subEventId] || 0);

      amount += alumniPrice + guestPrice * guestCount;
    });
    setTotalAmount(amount);
  };

  useEffect(() => {
    calculateTotalAmount(selectedSubEvents, guestsCount);
  }, [selectedSubEvents, guestsCount]);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handlePay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const body = {
      amount: totalAmount,
      category_id: 1,
      event_id: selectedEvent.id,
    };

    const response = await ajaxCall(
      "accounts/payment/initiate/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        method: "POST",
        body: JSON.stringify(body),
      },
      8000
    );
    if (!response) {
      alert("Server error. Are you online?");
      return;
    }
    const order = response.data;

    const userData = JSON.parse(localStorage.getItem("loginInfo"));

    const options = {
      key: "rzp_test_rVcN4qbDNcdN9s",
      amount: formData.total_amount,
      currency: "INR",
      description: "Test Transaction",
      order_id: order.order_id,
      handler: async function (response) {
        const data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await ajaxCall(
          "accounts/payment/success/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "POST",
            body: JSON.stringify(data),
          },
          8000
        );

        if (result?.status === 200) {
          toast.success("Payment Successful");
          setOpenDialog(false);
        }
      },
      prefill: {
        name: userData?.username,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleReset = () => setActiveStep(0);
  const isStepComplete = () => activeStep === steps.length - 1;

  const [formData, setFormData] = useState(initialData);

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
                          value={selectedEvent?.amount}
                          InputProps={{
                            readOnly: true,
                          }}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {activeStep === 1 && (
                  <>
                    {subEvents.map((subEvent) => (
                      <Grid key={subEvent.id} mt={2}>
                        <Typography variant="subtitle1" gutterBottom>
                          Sub Event: {subEvent.name}
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedSubEvents.includes(subEvent.id)}
                              onChange={(e) =>
                                handleSubEventSelection(
                                  subEvent.id,
                                  e.target.checked
                                )
                              }
                            />
                          }
                          label="Select Sub Event"
                        />
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Num Guests"
                              name={`subEventGuests_${subEvent.id}`}
                              type="number"
                              size="small"
                              onChange={(e) =>
                                handleGuestChange(subEvent.id, e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Alumni Price"
                              value={subEvent.pricing[0]?.alumni_price || ""}
                              InputProps={{
                                readOnly: true,
                              }}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              label="Guest Price"
                              value={subEvent.pricing[0]?.guest_price || ""}
                              InputProps={{
                                readOnly: true,
                              }}
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}

                {/* {activeStep === 2 && (
                  <Grid>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          size="small"
                          value={formData.name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          type="number"
                          size="small"
                          value={formData.phone}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Image"
                          name="image"
                          type="file"
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )} */}
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
                <Typography variant="h6">Total: {totalAmount}</Typography>
                <Button
                  variant="contained"
                  onClick={isStepComplete() ? handlePay : handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  size="small"
                >
                  {isStepComplete() ? `Pay: ${totalAmount}` : "Next"}
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
