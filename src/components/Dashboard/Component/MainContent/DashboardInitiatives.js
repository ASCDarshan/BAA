import React, { useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import ajaxCall from "../../../helpers/ajaxCall";

const DashboardInitiatives = ({ initiativesData }) => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

  const InitialData = {
    amount: "",
    donation_date: new Date().toISOString(),
    payment_status: "PENDING",
    transaction_id: "",
    initiative: "",
    donor: userID,
  };

  const [formData, setFormData] = useState(InitialData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : initiativesData.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < initiativesData.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
      return;
    }

    // creating a new order

    const body = {
      category_id: 1,
      amount: formData.amount,
    };

    // const result = await axios.post("http://localhost:5000/payment/orders");

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
    // Getting the order details back
    const order = response.data;

    const userData = JSON.parse(localStorage.getItem("loginInfo"));

    const options = {
      key: "rzp_test_rVcN4qbDNcdN9s",
      amount: formData.amount,
      description: "Test Transaction",
      order_id: order.order_id,
      handler: async function (response) {
        const data = {
          transaction_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature_id: response.razorpay_signature,
          amount: formData.amount,
          donor: userID,
          initiative: initiativesData[currentIndex].id,
        };
        const result = await ajaxCall(
          "initiatives/donations/",
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
        }
      },
      prefill: {
        name: userData?.username,
        // email: userDetails?.user?.email,
        // contact: userDetails?.phone_no,
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

  return (
    <Paper sx={{ p: 2, mb: 3, position: "relative" }}>
      <Typography variant="h6">Current Initiatives</Typography>
      {initiativesData.length > 0 && (
        <List>
          <ListItem>
            <ListItemText
              primary={initiativesData[currentIndex].name}
              secondary={initiativesData[currentIndex].purpose}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Funds Required"
              secondary={`${initiativesData[currentIndex].total_funds_required}`}
            />
            <ListItemText
              primary="Current Funds Raised"
              secondary={initiativesData[currentIndex].current_funds}
            />
          </ListItem>
        </List>
      )}

      {initiativesData.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            type="number"
            label="Enter Amount"
            variant="outlined"
            size="small"
            name="amount"
            value={formData.amount}
            onChange={handlePaymentChange}
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePay}
            size="small"
          >
            Pay
          </Button>
        </Box>
      )}

      {initiativesData.length > 1 && (
        <>
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default DashboardInitiatives;
