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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (url, data) => {
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
      if (response?.status === 200) {
        const result = response?.data;
        console.log(result);
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            accessToken: result?.accessToken,
            refreshToken: result?.refreshToken,
            userId: result?.user_id,
          })
        );

        toast.success("Login Successful");
        navigate("/dashboard");
      } else if (response.status === 400) {
        toast.error("Please Check Username and Password");
      } else if (response.status === 404) {
        toast.error("Username or Password is wrong, Please try again...");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginCredentials = { username: email, password };
    fetchData("accounts/login/", loginCredentials);
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
            mb: 2,
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
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Log In
              </Button>
            )}
            <Box sx={{ textAlign: "center" }}>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2">
                  Don't have an account? SignUp
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
