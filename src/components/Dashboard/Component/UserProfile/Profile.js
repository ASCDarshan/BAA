import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Divider,
  Paper,
  Button,
  Container,
  Card,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  School as SchoolIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CallIcon from "@mui/icons-material/Call";
import BackupTableIcon from "@mui/icons-material/BackupTable";
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

const Profile = () => {
  const [userProfileData, setUserProfileData] = useState(null);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;
  const [tabValue, setTabValue] = useState(0);

  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/dashboard/updateProfile");
  };

  const handleChangePassword = () => {
    navigate("/dashboard/changePassword");
  };

  const fetchData = async (url, setData) => {
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
    fetchData(`profiles/user-profile/user/${userID}/`, setUserProfileData);
  }, [userID]);

  if (!userProfileData) return null;

  const {
    profile_picture,
    bio,
    linkedin_profile,
    twitter_profile,
    facebook_profile,
    Education,
    degree,
    birth_date,
    phone_number,
    school_graduation_year,
    year_of_graduation,
    company,
    company_address,
    job_title,
    company_portfolio,
    company_website,
    alternative_email,
    industry,
    publications,
    achievements,
    skills,
    city,
    country,
    interests,
    postal_code,
    state,
    street_address,
    user: { username },
  } = userProfileData;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Container sx={{ mt: 10 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} textAlign="center">
              <Card
                elevation={4}
                sx={{
                  padding: 1,
                  boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
                }}
              >
                <Avatar
                  alt={username}
                  src={profile_picture}
                  sx={{ width: 130, height: 130, margin: "auto" }}
                />
                <Typography variant="h6" mt={2}>
                  {username}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {job_title || "Add Job-Title"} | Batch of{" "}
                  {school_graduation_year}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="center" gap={2}>
                  <IconButton href={linkedin_profile} target="_blank">
                    <LinkedInIcon fontSize="medium" color="primary" />
                  </IconButton>
                  <IconButton href={twitter_profile} target="_blank">
                    <TwitterIcon fontSize="medium" color="primary" />
                  </IconButton>
                  <IconButton href={facebook_profile} target="_blank">
                    <FacebookIcon fontSize="medium" color="primary" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Paper
                elevation={4}
                sx={{ p: 3, boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)" }}
              >
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                  <Tab label="Bio" />
                  <Tab label="Contact Info" />
                  <Tab label="Education" />
                  <Tab label="Company Info" />
                  <Tab label="Additional Info" />
                </Tabs>

                {/* Tab Panels */}
                {tabValue === 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Bio <LibraryBooksIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {bio || "No bio available"}
                    </Typography>
                    <Typography variant="body1">
                      Birth Date: {birth_date}
                    </Typography>
                    <Typography variant="body1">
                      School Graduation Year: {school_graduation_year}
                    </Typography>
                  </Box>
                )}
                {tabValue === 1 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Contact Information <CallIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1">
                      Email: {userProfileData.user.email}
                    </Typography>
                    <Typography variant="body1">
                      Alternate Email: {alternative_email}
                    </Typography>
                    <Typography variant="body1">
                      Phone: {phone_number}
                    </Typography>
                    <Typography variant="body1">
                      Address: {street_address}, {city}, {state}, {country},{" "}
                      {postal_code}
                    </Typography>
                  </Box>
                )}
                {tabValue === 2 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Education <SchoolIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1">
                      Degree:{" "}
                      {Education
                        ? `${Education}, ${degree}`
                        : "No education details available"}
                    </Typography>
                    <Typography variant="body1">
                      Graduation Year: {year_of_graduation || "N/A"}
                    </Typography>
                  </Box>
                )}
                {tabValue === 3 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Company Information <WorkIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1">Company: {company}</Typography>
                    <Typography variant="body1">
                      Job Title: {job_title}
                    </Typography>
                    <Typography variant="body1">
                      Industry: {industry}
                    </Typography>
                    <Typography variant="body1">Company: {company}</Typography>
                    <Typography variant="body1">
                      Address: {company_address}
                    </Typography>
                    <Typography variant="body1">
                      Company Website:{" "}
                      <Button
                        variant="text"
                        color="primary"
                        href={company_website}
                        target="_blank"
                      >
                        Visit Website
                      </Button>
                    </Typography>
                    <Typography variant="body1">
                      Portfolio:{" "}
                      <Button
                        variant="text"
                        color="primary"
                        href={company_portfolio}
                        target="_blank"
                      >
                        View Portfolio
                      </Button>
                    </Typography>
                  </Box>
                )}

                {tabValue === 4 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Additional Information{" "}
                      <BackupTableIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1">
                      Interest: {interests}
                    </Typography>
                    <Typography variant="body1">Skills: {skills}</Typography>
                    <Typography variant="body1">
                      Achievements: {achievements}
                    </Typography>
                    <Typography variant="body1">
                      Publications: {publications}
                    </Typography>
                  </Box>
                )}

                <Box mt={3} textAlign="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                    size="small"
                    sx={{ mr: 2 }}
                  >
                    Update Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleChangePassword}
                    size="small"
                  >
                    Change Password
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
