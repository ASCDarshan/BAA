import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ajaxCall from "../helpers/ajaxCall";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleTermsDialogOpen = () => setOpenTermsDialog(true);
  const handleTermsDialogClose = () => setOpenTermsDialog(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      username: "",
      batchyear: "",
      terms_confirmed: false,
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      batchyear: Yup.number()
        .required("Batch year is required")
        .max(
          new Date().getFullYear() - 1,
          `Enter batch year below ${new Date().getFullYear()}`
        ),
      username: Yup.string().required("Username is required"),
      terms_confirmed: Yup.boolean().oneOf(
        [true],
        "You must accept terms and conditions"
      ),
    }),

    onSubmit: (values) => {
      const signupData = {
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
        username: values.username,
        batchyear: values.batchyear,
        terms_confirmed: values.terms_confirmed,
      };

      fetchData("accounts/signup/", signupData);
    },
  });

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
      if (response?.status === 201) {
        toast.success(
          "Mail sent successfully. Please check your email and verify."
        );
        formik.resetForm();
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again");
    }
    setIsLoading(false);
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
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirm_password &&
                Boolean(formik.errors.confirm_password)
              }
              helperText={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="batchyear"
              label="Batch Year(Year of Passing 12th std)"
              type="text"
              value={formik.values.batchyear}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.batchyear && Boolean(formik.errors.batchyear)
              }
              helperText={formik.touched.batchyear && formik.errors.batchyear}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="terms_confirmed"
                  color="primary"
                  checked={formik.values.terms_confirmed}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label={
                <span>
                  I accept the
                  <Button
                    onClick={handleTermsDialogOpen}
                    style={{
                      textTransform: "none",
                      textDecoration: "underline",
                      padding: 0,
                      marginLeft: "5px",
                    }}
                  >
                    Terms and Conditions
                  </Button>
                </span>
              }
            />

            {formik.touched.terms_confirmed &&
              formik.errors.terms_confirmed && (
                <Typography color="error" variant="caption">
                  {formik.errors.terms_confirmed}
                </Typography>
              )}

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
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>

      <Dialog open={openTermsDialog} onClose={handleTermsDialogClose}>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Here are some dummy terms and conditions. You can replace this text
            with the actual content later. Make sure to read all the terms
            before agreeing.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register;
