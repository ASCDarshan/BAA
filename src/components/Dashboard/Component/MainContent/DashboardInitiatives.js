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
    payment_status: "COMPLETED",
    transaction_id: Math.floor(Math.random() * 100),
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

  const handlePay = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      initiative: initiativesData[currentIndex].id,
    };

    const formDataToSend = JSON.stringify(updatedFormData);

    try {
      const response = await ajaxCall(
        `initiatives/donations/`,
        {
          method: "POST",
          body: formDataToSend,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Donation Completed Successfully");
        setFormData(InitialData);
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
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
