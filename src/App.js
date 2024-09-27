import React, { useState } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
//landing page components
import Navbar from "./components/LandingPage/Component/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import Event from "./components/LandingPage/Component/EventPage/Event";
import EventData from "./components/LandingPage/Component/EventPage/EventData";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footers from "./components/LandingPage/Component/Footer/Footers";
// dashboard components
import Dashboard from "./components/Dashboard/Component/Dashboard";
import AdminNavbar from "./components/Dashboard/Component/Navbar/Navbar";
import AdminSidebar from "./components/Dashboard/Component/SideBar/Sidebar";
import Profile from "./components/Dashboard/Component/UserProfile/Profile";
import UserProfile from "./components/Dashboard/Component/UserProfile/UserProfile";
import EventSection from "./components/Dashboard/Component/EventsSection/EventSection";
import InitiativesSection from "./components/Dashboard/Component/EventsSection/InitiativesSection";
import Batchmate from "./components/Dashboard/Component/BatchMate-section/Batchmate";
import CheckUser from "./components/Dashboard/Component/UserProfile/CheckUser";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/register", "/dashboard"];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        {!hideFooterPaths.includes(location.pathname) && <Footers />}
      </>
    );
  };

  const AdminLayout = () => {
    return (
      <>
        <AdminNavbar handleDrawerToggle={handleDrawerToggle} />
        <AdminSidebar
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Outlet />
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<Event />} />
          <Route path="/events/:eventId" element={<EventData />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/addEvents" element={<EventSection />} />
          <Route
            path="/dashboard/addInitiatives"
            element={<InitiativesSection />}
          />
          <Route path="/dashboard/userProfile" element={<Profile />} />
          <Route path="/dashboard/updateProfile" element={<UserProfile />} />
          <Route
            path="/dashboard/userProfile/:UserId"
            element={<CheckUser />}
          />
          <Route path="/dashboard/batchmates" element={<Batchmate />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
