import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const ChangePassword = () => {
  const [current_password, setCurrentPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [newpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password !== newpassword) {
      setError("New password and confirm password do not match");
      return;
    }
    if (!current_password || !password || !newpassword) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      const response = await ajaxCall(
        "accounts/changepassword/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify({
            current_password,
            password: password,
            newpassword: newpassword,
          }),
        },
        8000
      );
      console.log("----response---->", response);
      if (response?.status === 200) {
        navigate("/dashboard/userProfile");
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.errors.non_field_errors[0]);
      }
    } catch (error) {
      console.log(error);
      setError("Network error occurred");
    } finally {
      console.log("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 10 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            maxWidth: 500,
            margin: "0 auto",
            boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Change Password
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              margin="normal"
              value={current_password}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleChangePassword}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePassword;
