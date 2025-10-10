// import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./landing_page/pages/Home.jsx";
import Screening from "./landing_page/pages/Screening.jsx";
import AIChat from "./landing_page/pages/AIChat.jsx";
import Booking from "./landing_page/pages/Booking.jsx";
import Resources from "./landing_page/pages/Resources.jsx";
import PeerSupport from "./landing_page/pages/PeerSupport.jsx";
import AdminDashboard from "./landing_page/admin/AdminDashboard.jsx";
import NotFound from "./landing_page/NotFound.jsx";
import Navbar from "./landing_page/Navbar.jsx";
import Footer from "./landing_page/Footer.jsx";
import Signup from "./landing_page/signup/Signup.jsx";
import Login from "./landing_page/login/Login.jsx";

function App() {
  const location = useLocation();
  // Check if current route starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      {/* Show Navbar & Footer only if NOT on admin routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/peer-support" element={<PeerSupport />} />

        {/* Admin Route */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
