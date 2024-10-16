import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ajaxCall from "../helpers/ajaxCall";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginInfo = localStorage.getItem("loginInfo");
      if (loginInfo) {
        const { userId } = JSON.parse(loginInfo);
        if (userId && location.pathname === "/login") {
          navigate("/dashboard/addEvents");
        }
      }
    };

    checkLoginStatus();
  }, [navigate, location]);

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
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            accessToken: result?.access,
            refreshToken: result?.refresh,
            userId: result?.user_id,
            userRole: result?.user_type,
            is_member: result?.is_member,
          })
        );
        toast.success("Login Successful");
        if (result?.is_member) {
          navigate("/dashboard");
        } else {
          navigate("/becomemember");
        }
      } else if (response.status === 400) {
        if (response.data.error === "Invalid credentials") {
          toast.error(response.data.error);
        } else {
          toast.error(
            "Email not verified. Please verify your email to log in."
          );
        }
      } else if (response.status === 404) {
        toast.error("Username or Password is wrong, Please try again...");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const loginCredentials = {
        username: values.email,
        password: values.password,
      };
      fetchData("accounts/login/", loginCredentials);
    },
  });

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
            boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
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
            boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
          }}
        >
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
                Don't have an account? SignUp
              </Link>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Link
                to="/forgotPassword"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Forgot Password
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
