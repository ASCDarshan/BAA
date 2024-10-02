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
  CircularProgress,
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
  const [loading, setLoading] = useState(false);

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

  function loadScript(src) {
    return new Promise((resolve) => {
      setLoading(true);
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        setLoading(false);
        resolve(true);
      };
      script.onerror = () => {
        setLoading(false);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
                secondary={`${formatDate(event.start_date)} to ${formatDate(
                  event.end_date
                )}`}
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
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                onClick={handlePay}
              >
                Pay
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardEvents;
