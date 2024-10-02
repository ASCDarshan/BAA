import React from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ajaxCall from "../helpers/ajaxCall";
import { toast } from "react-toastify";

const Register = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchData = async (url, data) => {
    setIsLoading(true);
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
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response?.status === 201) {
        toast.success(
          "Mail send successfully. Please Check Your Mail and Verify"
        );
      } else {
        toast.error("Registration failed. Please try again");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again");
    }
    setIsLoading(false);
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      batchyear: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      batchyear: Yup.string().required("batchyear is required"),
      username: Yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      const signupData = {
        email: values.email,
        password: values.password,
        username: values.username,
        batchyear: values.batchyear,
      };
      fetchData("accounts/signup/", signupData);
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
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="User Name"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="batchyear"
              label="Batch Year"
              type="text"
              value={formik.values.batchyear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.batchyear && Boolean(formik.errors.batchyear)
              }
              helperText={formik.touched.batchyear && formik.errors.batchyear}
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
              <Typography variant="body2">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {" "}
                  Already have an account? Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
