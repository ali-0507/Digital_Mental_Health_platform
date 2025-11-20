 import {useEffect} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// Protected Route
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// Pages Route
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
import ScreeningHistory from "./landing_page/pages/ScreeningHistory.jsx";
import ResourceGuide from "./landing_page/pages/ResourceGuide.jsx";
import RelaxationAudio from "./landing_page/pages/RelaxationAudio.jsx";
import MindfulnessVideo from "./landing_page/pages/MindfulnessVideo.jsx";
import Dashboard from "./landing_page/pages/User.Dashboard.jsx";
import AdminLogin from "./landing_page/admin/pages/AdminLogin.jsx";


function App() {
  const location = useLocation();
  // Check if current route starts with /
  
    // Keyboard shortcut for Admin Login
  useEffect(() => {
    const handler = (e) => {
      if (location.pathname.startsWith("/admin")) return; // disable inside admin

      if (e.shiftKey && e.key === "A") {
        window.location.href = "/admin/login";
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [location.pathname]);




  
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      {/* Show Navbar & Footer only if NOT on admin routes */}
      {!isAdminRoute && !isDashboardRoute && <Navbar />}
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/screening" element={<Screening />} />
        <Route path="/chat" element={<AIChat />} />
        <Route path="/booking" element={<Booking />} />
    
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/relaxation-audio" element={<RelaxationAudio />} />
        <Route path="/mindfulness-video" element={<MindfulnessVideo />} />

        <Route path="/peer-support" element={<PeerSupport />} />


        <Route
           path="/dashboard"
              element={
          <ProtectedRoute>
                <Dashboard />
           </ProtectedRoute>
         }
        />

        {/* Admin Route */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} /> */}
         {/* Protected Admin Route */}
         <Route path="/admin/login" element={<AdminLogin/>} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <ScreeningHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/guides"
          element={
            <ProtectedRoute>
              <ResourceGuide/>
            </ProtectedRoute>
          }
          />


        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && !isDashboardRoute && <Footer />}

    </div>
  );
}

export default App;
