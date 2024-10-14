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
  "Accompanying Guests",
];

const DashboardEvents = ({ eventsData }) => {
  const [eventregistrationsData, seteventRegistrationsData] = useState([]);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

  const isUserRegistered = eventregistrationsData.some(
    (registration) => registration.alumni === userID
  );

  const initialData = {
    registration_date: new Date().toISOString(),
    total_amount: "",
    payment_status: "PENDING",
    full_event_access: true,
    event: "",
    alumni: userID,
    subevent_registrations: [],
    guests: [],
  };

  const [formData, setFormData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [subEvents, setSubEvents] = useState([]);
  const [selectedSubEvents, setSelectedSubEvents] = useState([]);
  const [guestsCount, setGuestsCount] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);

  useEffect(() => {
    fetchData("events/registrations/", seteventRegistrationsData);
  }, []);

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
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
    }
  };

  const handleOpenDialog = (event) => {
    setSelectedEvent(event);
    setSubEvents(event.subevents || []);
    setOpenDialog(true);
    setGuestsCount({});
    setSelectedSubEvents([]);
    setTotalAmount(event.price || 0);
    setFormData({ ...initialData, event: event.id });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
    setFormData(initialData);
    setTotalGuests(0);
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

    const newTotalGuests = Object.values(updatedGuestsCount).reduce(
      (sum, count) => sum + parseInt(count || 0),
      0
    );
    setTotalGuests(newTotalGuests);

    calculateTotalAmount(selectedSubEvents, updatedGuestsCount);

    // Update formData with subevent_registrations
    const updatedSubEventRegistrations = selectedSubEvents.map(
      (subEventId) => ({
        subevent: subEventId,
        num_guests: parseInt(updatedGuestsCount[subEventId] || 0),
        amount_paid: "0.00", // You may need to calculate this based on your pricing logic
        attended: false,
      })
    );

    setFormData((prevData) => ({
      ...prevData,
      subevent_registrations: updatedSubEventRegistrations,
      guests: Array(newTotalGuests)
        .fill({})
        .map(() => ({ name: "", phone: "", image: null })),
    }));
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
    setFormData((prevData) => ({
      ...prevData,
      total_amount: amount.toFixed(2),
    }));
  };

  const handleNext = () => {
    if (activeStep === 1 && totalGuests === 0) {
      // Skip guest registration step if no guests
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleGuestInfoChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedGuests = [...prevData.guests];
      updatedGuests[index] = {
        ...updatedGuests[index],
        [field]: field === "image" ? value : value,
      };
      return { ...prevData, guests: updatedGuests };
    });
  };

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
      throw new Error("Razorpay SDK failed to load");
    }

    const body = {
      amount: formData.total_amount,
      category_id: 1,
      event_id: formData.event,
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

    if (!response || response?.status !== 200) {
      alert("Server error. Are you online?");
      throw new Error("Payment initiation failed");
    }

    const order = response.data;
    const userData = JSON.parse(localStorage.getItem("loginInfo"));

    return new Promise((resolve, reject) => {
      const options = {
        key: "rzp_test_rVcN4qbDNcdN9s",
        amount: formData.total_amount * 100,
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
            resolve(); // Resolve the promise if payment is successful
          } else {
            toast.error("Payment verification failed");
            reject(new Error("Payment verification failed"));
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
      paymentObject.on("payment.failed", function (response) {
        toast.error("Payment failed");
        reject(new Error("Payment failed"));
      });
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // Append non-file data
      formDataToSend.append("event", formData.event);
      formDataToSend.append("alumni", formData.alumni);
      formDataToSend.append("total_amount", formData.total_amount);
      formDataToSend.append("payment_status", formData.payment_status);
      formDataToSend.append("full_event_access", formData.full_event_access);

      // Append subevent_registrations as JSON string
      formDataToSend.append(
        "subevent_registrations",
        JSON.stringify(formData.subevent_registrations)
      );

      // Append guests data and files
      formData.guests.forEach((guest, index) => {
        formDataToSend.append(`guests[${index}]name`, guest.name);
        formDataToSend.append(`guests[${index}]phone`, guest.phone);
        if (guest.image instanceof File) {
          formDataToSend.append(
            `guests[${index}]image`,
            guest.image,
            guest.image.name
          );
        }
      });

      // Attempt payment
      await handlePay();

      // Payment successful, proceed with registration
      const response = await ajaxCall(
        "events/registrations/",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: formDataToSend,
        },
        8000
      );

      if (response?.status === 201) {
        toast.success("Registration Completed Successfully");
        handleCloseDialog();
      } else {
        console.error("Registration API response:", response);
        toast.error("Registration Failed");
      }
    } catch (error) {
      // Handle errors from either the payment or registration
      console.error("Error during registration or payment:", error);
      toast.error("Registration or Payment Failed");
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
                disabled={isUserRegistered}
              >
                {isUserRegistered ? "Registered" : "Register"}
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

          <form>
            {activeStep === 0 && (
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
            )}

            {activeStep === 1 && (
              <>
                {subEvents.map((subEvent) => (
                  <Grid key={subEvent.id} mt={2}>
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
                      label="Select Event"
                    />
                    <Typography variant="subtitle1" gutterBottom>
                      Event : {subEvent.name}
                    </Typography>
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

            {activeStep === 2 && totalGuests > 0 && (
              <>
                {formData.guests.map((guest, index) => (
                  <Grid container spacing={2} sx={{ mt: 2 }} key={index}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Guest {index + 1}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={guest.name}
                        onChange={(e) =>
                          handleGuestInfoChange(index, "name", e.target.value)
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={guest.phone}
                        onChange={(e) =>
                          handleGuestInfoChange(index, "phone", e.target.value)
                        }
                        type="number"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleGuestInfoChange(
                            index,
                            "image",
                            e.target.files[0]
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                ))}
              </>
            )}
          </form>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
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
              onClick={activeStep === steps.length - 1 ? handlePay : handleNext}
              sx={{ mt: 1, mr: 1 }}
              size="small"
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardEvents;
