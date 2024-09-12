import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Component/Dashboard";
import Navbar from "./components/LandingPage/Component/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./components/Dashboard/Component/UserProfile/UserProfile";
import Footers from "./components/LandingPage/Component/Footer/Footers";
import Event from "./components/LandingPage/Component/EventPage/Event";
import EventSection from "./components/Dashboard/Component/EventsSection/EventSection";
import InitiativesSection from "./components/Dashboard/Component/EventsSection/InitiativesSection";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  const location = useLocation();

  const hideFooterPaths = [
    "/dashboard",
    "/login",
    "/register",
    "/userProfile",
    "/addEvents",
    "/addInitiatives",
  ];

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Event />} />
        <Route path="/addEvents" element={<EventSection />} />
        <Route path="/addInitiatives" element={<InitiativesSection />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
      {!hideFooterPaths.includes(location.pathname) && <Footers />}
    </ThemeProvider>
  );
}

export default App;
