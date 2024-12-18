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
import Contact from "./components/LandingPage/Component/ContactUs/ContactUs";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Footers from "./components/LandingPage/Component/Footer/Footers";
import Blogs from "./components/LandingPage/Component/Blogs/Blog";
import Gallery from "./components/LandingPage/Component/Gallery/Gallery";
import Terms from "./components/LandingPage/Component/TermsAndConditons/Terms";
import Privacy from "./components/LandingPage/Component/TermsAndConditons/Privacy";
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
import DashboardEventData from "./components/Dashboard/Component/EventsSection/EventData";
import DashboardInitiativesData from "./components/Dashboard/Component/EventsSection/InitiativeData";
import BlogDetails from "./components/LandingPage/Component/Blogs/BlogDetails";
import PostsByFollowing from "./components/Dashboard/Component/MainContent/PostsByFollowing";
import ChangePassword from "./components/Dashboard/Component/UserProfile/ChangePassword";
import DashboardTwo from "./components/Dashboard/Component/DashboardTwo";
import HeroBanner from "./components/LandingPage/Component/Content/HeroBanner";

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
    "/login",
    "/register",
    "/dashboard",
    "/forgotPassword",
  ];

  const hideBanner = ["/login", "/register", "/forgotPassword"];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const Layout = () => {
    return (
      <>
        <Navbar />
        {!hideBanner.includes(location.pathname) && <HeroBanner />}
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/events/:eventName" element={<EventData />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Blogs/:BlogId" element={<BlogDetails />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Privacy" element={<Privacy />} />
        </Route>

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/addEvents" element={<EventSection />} />
          <Route
            path="/dashboard/followingPost"
            element={<PostsByFollowing />}
          />
          <Route
            path="/dashboard/event/:eventName"
            element={<DashboardEventData />}
          />
          <Route
            path="/dashboard/addInitiatives"
            element={<InitiativesSection />}
          />
          <Route
            path="/dashboard/addInitiatives/:InitiativeId"
            element={<DashboardInitiativesData />}
          />
          <Route path="/dashboard/userProfile" element={<Profile />} />
          <Route path="/dashboard/updateProfile" element={<UserProfile />} />
          <Route
            path="/dashboard/changePassword"
            element={<ChangePassword />}
          />
          <Route
            path="/dashboard/userProfile/:UserId"
            element={<CheckUser />}
          />
          <Route path="/dashboard/batchmates" element={<Batchmate />} />
        </Route>
        <Route path="/becomemember" element={<DashboardTwo />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
