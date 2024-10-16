import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const Membership = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState([]);
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(2500);

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;
  const isLifetimeMember = paymentData.some(
    (data) => data.user === userID && data.is_member === true
  );

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginInfo?.accessToken}`,
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

  useEffect(() => {
    fetchData(`accounts/member/list/`, setPaymentData);
  }, [count]);

  const loadScript = (src) => {
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
  };

  const handlePay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const body = {
      amount: amount,
    };

    const response = await ajaxCall(
      "accounts/member/initiate/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginInfo?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(body),
      },
      8000
    );

    if (!response) {
      toast.error("Server error. Are you online?");
      return;
    }

    const order = response.data;

    const options = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY,
      amount: amount * 100,
      currency: "INR",
      description: "Lifetime Membership",
      order_id: order.order_id,
      handler: async function (response) {
        const data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await ajaxCall(
          "accounts/member/success/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginInfo?.accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(data),
          },
          8000
        );

        if (result?.status === 200) {
          toast.success("Payment Successful");
          setCount(1);
        } else {
          toast.error("Payment Failed");
        }
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Paper sx={{ p: 2, mb: 3, boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)" }}>
      {isLifetimeMember ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#e0f7fa",
            borderRadius: "10px",
            padding: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#26a69a",
              color: "white",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
            }}
          >
            ✔
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: "#00796b",
            }}
          >
            You are a Lifetime Member
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Become A Lifetime Member</Typography>
          <TextField
            label="Amount"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            size="small"
            name="amount"
            InputProps={{
              readOnly: true,
            }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePay}
            size="small"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Pay"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Membership;
