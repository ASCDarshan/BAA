import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Container,
  CardMedia,
  CircularProgress,
  Divider,
  Paper,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import ajaxCall from "../../../helpers/ajaxCall";
import Breadcrumb from "../../../Ul/Breadcrumb";
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (timeString) => {
  const [hour, minute] = timeString.split(":");
  const hour12 = hour % 12 || 12;
  const ampm = hour >= 12 ? "PM" : "AM";
  return `${hour12}:${minute} ${ampm}`;
};

const BackgroundImage = styled("div")(({ bgImage }) => ({
  width: "100%",
  height: "400px",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
}));

const steps = ["Event Registration", "Sub Event Registration"];

const EventData = () => {
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const { eventId } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [subEvents, setSubEvents] = useState([]);
  const [selectedSubEvents, setSelectedSubEvents] = useState([]);
  const [guestsCount, setGuestsCount] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

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
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData("events/events/", setEventData);
  }, []);

  useEffect(() => {
    if (eventData.length > 0) {
      const event = eventData.find((item) => item.id === Number(eventId));
      setSelectedEvent(event);
      setSubEvents(event?.subevents || []);
      setTotalAmount(event?.amount || 0);
    }
  }, [eventData, eventId]);

  const handleRegistrations = () => {
    setOpenDialog(true);
    setActiveStep(0);
    setSelectedSubEvents([]);
    setGuestsCount({});
    setTotalAmount(selectedEvent?.amount || 0);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
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

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleReset = () => setActiveStep(0);
  const isStepComplete = () => activeStep === steps.length - 1;

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
      amount: totalAmount,
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

  const handleShareEvent = () => {
    const currentUrl = window.location.href;
    const message = `Check out this event: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box>
        <Breadcrumb title="Event" main="Dashboard" />
        <Paper
          elevation={3}
          sx={{
            backgroundColor: theme.palette.background.paper,
            mt: 2,
            p: 2,
            boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
          }}
        >
          <CardContent>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="300px"
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container>
                  <Grid item xs={12} mb={2}>
                    <BackgroundImage bgImage={selectedEvent.event_banner} />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                      {selectedEvent.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedEvent.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      Time: {formatTime(selectedEvent.start_time)} -{" "}
                      {formatTime(selectedEvent.end_time)}
                      <br />
                      Starts from {formatDate(selectedEvent.start_date)} to{" "}
                      {formatDate(selectedEvent.end_date)}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "250px",
                      marginTop: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        height: "80%",
                        width: "80%",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      image={selectedEvent.qr_code}
                      alt={selectedEvent.title || "Upcoming Event"}
                    />
                  </Grid>
                </Grid>

                {selectedEvent.subevents?.length > 0 && (
                  <>
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h5" gutterBottom>
                      Event Schedule
                    </Typography>

                    {selectedEvent.subevents.map((subevent, subIndex) => (
                      <Box key={subIndex} sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>
                          <b>{subevent.name}</b> ({formatDate(subevent.date)})
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {subevent.description}
                        </Typography>
                        <Typography variant="body2">
                          Time: {formatTime(subevent.start_time)} -{" "}
                          {formatTime(subevent.end_time)}
                        </Typography>
                        <Typography variant="body2">
                          Location: {subevent.location || "To be announced"}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Max Participants: {subevent.max_participants}
                        </Typography>

                        {/* Display Pricing */}
                        {subevent.pricing?.length > 0 && (
                          <>
                            <Typography variant="subtitle1" gutterBottom>
                              Pricing:
                            </Typography>
                            {subevent.pricing.map((price, priceIndex) => (
                              <Box key={priceIndex} sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                  Alumni Price: {price.alumni_price}
                                </Typography>
                                <Typography variant="body2">
                                  Guest Price: {price.guest_price}
                                </Typography>
                              </Box>
                            ))}
                          </>
                        )}
                      </Box>
                    ))}
                  </>
                )}

                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="flex-end"
                  mt={2}
                  mb={3}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleRegistrations}
                    sx={{ mr: 2 }}
                  >
                    Register
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleShareEvent}
                    sx={{ mr: 2 }}
                  >
                    Share Event
                  </Button>
                </Grid>
              </>
            )}
          </CardContent>
        </Paper>
      </Box>

      {/* Updated Dialog for Registration */}
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
                All steps completed - you're finished!
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 2 }}>
                Reset
              </Button>
            </Box>
          ) : (
            <>
              <form>
                {activeStep === 0 && (
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Event"
                        value={selectedEvent?.name || ""}
                        InputProps={{
                          readOnly: true,
                        }}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Total Amount"
                        value={selectedEvent?.amount}
                        InputProps={{
                          readOnly: true,
                        }}
                        size="small"
                      />
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
    </Container>
  );
};

export default EventData;
