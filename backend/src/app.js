const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
 
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const auditRoutes = require("./routes/audit");

const UserDashboardRoutes = require("./routes/User.Dashboard");
//  Booking 
const bookingRoutes = require("../src/routes/booking");
//peerSupport
const peerSupportRoutes = require("./routes/peerSupport.routes");
//Screening
const screeningRoute = require("./routes/screeningRoutes");
// AIChat 
const AIChatRoute = require("./routes/AIChat.routes");
// Resources
const resourcesRoutes = require("./routes/resources.routes");

//  Admin Public Resources
const publicResourcesRoutes = require("./routes/Admin.ResourcesRoute");




const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" , credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//base route 
app.get("/", (req, res) => {
  res.send("API is running...");
});

//auth endpoints
app.use("/api/auth", authRoutes);


// peer-support
app.use("/api/peer-support", peerSupportRoutes);
//Screening route
app.use("/api/screenings", screeningRoute);
// AIChat route
app.use("/api/chat", AIChatRoute);
// Booking Endpoints 
app.use("/api/bookings", bookingRoutes);
// Resources endpoints
app.use("/api/resources", resourcesRoutes);
// user dashboard
app.use("/api/dashboard", UserDashboardRoutes);



// Admin endpoints (protected + admin only)
app.use("/api/admin", adminRoutes);
// Audit logs (protected + admin only)
app.use("/api/audit", auditRoutes);

app.use("/api/resources", publicResourcesRoutes); // Admin Public Resources
 
app.get("/api/health", (req, res) => res.json({ ok: true }));

module.exports = app;