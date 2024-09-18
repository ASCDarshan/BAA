import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
  Container,
  Typography,
  Paper,
  createTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import ajaxCall from "../../../helpers/ajaxCall";

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

const steps = [
  "Personal Information",
  "Address",
  "Education",
  "Professional Information",
  "Social Media",
  "Privacy Settings",
  "Additional Information",
];

const ProfileForm = ({ userID }) => {
  const [userProfileData, setUserProfileData] = useState([]);
  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
    fetchData(`profiles/user-profile/${userID}/`, setUserProfileData);
  }, []);

  // const Data = {
  //   school_graduation_year: userProfileData.school_graduation_year,
  //   birth_date: userProfileData.birth_date,
  //   bio: userProfileData.bio,
  //   profile_picture: userProfileData.profile_picture,
  //   phone_number: userProfileData.phone_number,
  //   alternative_email: userProfileData.alternative_email,
  //   street_address: userProfileData.street_address,
  //   city: userProfileData.city,
  //   state: userProfileData.state,
  //   country: userProfileData.country,
  //   postal_code: userProfileData.postal_code,
  //   Education: userProfileData.Education,
  //   degree: userProfileData.degree,
  //   major: userProfileData.major,
  //   year_of_graduation: userProfileData.year_of_graduation,
  //   company: userProfileData.company,
  //   company_address: userProfileData.company_address,
  //   company_website: userProfileData.company_website,
  //   job_title: userProfileData.job_title,
  //   industry: userProfileData.industry,
  //   company_portfolio: null,
  //   linkedin_profile: userProfileData.linkedin_profile,
  //   twitter_profile: userProfileData.twitter_profile,
  //   facebook_profile: userProfileData.facebook_profile,
  //   is_mentor: false,
  //   mentorship_areas: userProfileData.mentorship_areas,
  //   show_email: false,
  //   show_phone: false,
  //   interests: userProfileData.interests,
  //   skills: userProfileData.skills,
  //   achievements: userProfileData.achievements,
  //   publications: userProfileData.publications,
  //   created_at: new Date().toISOString(),
  //   updated_at: new Date().toISOString(),
  //   user: userID,
  // };

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    school_graduation_year: userProfileData.school_graduation_year,
    birth_date: userProfileData.birth_date,
    bio: userProfileData.bio,
    profile_picture: userProfileData.profile_picture,
    phone_number: userProfileData.phone_number,
    alternative_email: userProfileData.alternative_email,
    street_address: userProfileData.street_address,
    city: userProfileData.city,
    state: userProfileData.state,
    country: userProfileData.country,
    postal_code: userProfileData.postal_code,
    Education: userProfileData.Education,
    degree: userProfileData.degree,
    major: userProfileData.major,
    year_of_graduation: userProfileData.year_of_graduation,
    company: userProfileData.company,
    company_address: userProfileData.company_address,
    company_website: userProfileData.company_website,
    job_title: userProfileData.job_title,
    industry: userProfileData.industry,
    company_portfolio: null,
    linkedin_profile: userProfileData.linkedin_profile,
    twitter_profile: userProfileData.twitter_profile,
    facebook_profile: userProfileData.facebook_profile,
    is_mentor: false,
    mentorship_areas: userProfileData.mentorship_areas,
    show_email: false,
    show_phone: false,
    interests: userProfileData.interests,
    skills: userProfileData.skills,
    achievements: userProfileData.achievements,
    publications: userProfileData.publications,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user: userID,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_picture: file,
      company_portfolio: file,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      "school_graduation_year",
      formData.school_graduation_year
    );
    formDataToSend.append("birth_date", formData.birth_date);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("profile_picture", formData.profile_picture);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("alternative_email", formData.alternative_email);
    formDataToSend.append("street_address", formData.street_address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("postal_code", formData.postal_code);
    formDataToSend.append("Education", formData.Education);
    formDataToSend.append("degree", formData.degree);
    formDataToSend.append("year_of_graduation", formData.year_of_graduation);
    formDataToSend.append("company", formData.company);
    formDataToSend.append("company_address", formData.company_address);
    formDataToSend.append("company_website", formData.company_website);
    formDataToSend.append("job_title", formData.job_title);
    formDataToSend.append("company_portfolio", formData.company_portfolio);
    formDataToSend.append("linkedin_profile", formData.linkedin_profile);
    formDataToSend.append("twitter_profile", formData.twitter_profile);
    formDataToSend.append("facebook_profile", formData.facebook_profile);
    formDataToSend.append("is_mentor", formData.is_mentor);
    formDataToSend.append("mentorship_areas", formData.mentorship_areas);
    formDataToSend.append("show_phone", formData.show_phone);
    formDataToSend.append("show_email", formData.show_email);
    formDataToSend.append("interests", formData.interests);
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("achievements", formData.achievements);
    formDataToSend.append("publications", formData.publications);
    formDataToSend.append("created_at", formData.created_at);
    formDataToSend.append("updated_at", formData.updated_at);
    formDataToSend.append("user", userID);
    try {
      const response = await ajaxCall(
        `profiles/user-profile/${userID}/`,
        {
          method: "PATCH",
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
        toast.success("Post Created Successfully");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="School Graduation Year"
                name="school_graduation_year"
                value={formData.school_graduation_year}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Birth Date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="file"
                label="Profile Picture"
                name="profile_picture"
                InputLabelProps={{ shrink: true }}
                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Alternative Email"
                name="alternative_email"
                value={formData.alternative_email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Street Address"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Education"
                name="Education"
                value={formData.Education}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Major"
                name="major"
                value={formData.major}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Year of Graduation"
                name="year_of_graduation"
                value={formData.year_of_graduation}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Address"
                name="company_address"
                value={formData.company_address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Company Website"
                name="company_website"
                value={formData.company_website}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="file"
                InputLabelProps={{ shrink: true }}
                label="Company Portfolio"
                name="company_portfolio"
                onChange={handleFileChange}
              />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedin_profile"
                value={formData.linkedin_profile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Twitter"
                name="twitter_profile"
                value={formData.twitter_profile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Facebook"
                name="facebook_profile"
                value={formData.facebook_profile}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 5:
        return (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mentorship Areas"
                name="mentorship_areas"
                value={formData.mentorship_areas}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_mentor}
                    onChange={handleCheckboxChange}
                    name="is_mentor"
                  />
                }
                label="Is Mentor"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.show_email}
                    onChange={handleCheckboxChange}
                    name="show_email"
                  />
                }
                label="Show Email"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.show_phone}
                    onChange={handleCheckboxChange}
                    name="show_phone"
                  />
                }
                label="Show Phone"
              />
            </Grid>
          </Grid>
        );
      case 6:
        return (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Interest"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Publications"
                name="publications"
                value={formData.publications}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Box>
        <Paper
          elevation={3}
          sx={{ p: 3, backgroundColor: theme.palette.background.paper }}
        >
          <Typography variant="h5">Update Profile</Typography>
          <Grid item xs={12} md={8}>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {renderStepContent(activeStep)}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                {activeStep !== 0 && (
                  <Button size="small" onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={formData.isSubmitting}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </Grid>
                )}
              </Box>
            </Box>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileForm;
