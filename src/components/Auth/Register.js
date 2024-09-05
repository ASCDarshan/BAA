import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import ajaxCall from "../helpers/ajaxCall";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alumni_no, setalumniNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async (url, data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response?.status === 201) {
        toast.success("Registration successful:");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again");
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      username: email,
      password: password,
      alumni_no: alumni_no,
      // verificatiourl: verificatiourl,
    };

    fetchData("accounts/signup/", signupData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2, // Add margin bottom
          }}
        >
          <img
            src="/logo.png"
            alt="BAA Logo"
            style={{ width: "150px", height: "auto" }}
          />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              type="text"
              required
              fullWidth
              label="Username"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="alumni_no"
              label="Alumni Number"
              type="number"
              value={alumni_no}
              onChange={(e) => setalumniNo(e.target.value)}
            />
            {isLoading ? (
              <Button variant="contained" color="primary" fullWidth disabled>
                <CircularProgress />
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            <Box sx={{ textAlign: "center" }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2">
                  Already have an account? Sign In
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
