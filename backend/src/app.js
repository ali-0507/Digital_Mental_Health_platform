const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");

 
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const auditRoutes = require("./routes/audit");

const bookingRoutes = require("../src/routes/booking");

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//base route 
app.get("/", (req, res) => {
  res.send("API is running...");
});

//auth endpoints
app.use("/api/auth", authRoutes);

// Admin endpoints (protected + admin only)
app.use("/api/admin", adminRoutes);

// Audit logs (protected + admin only)
app.use("/api/audit", auditRoutes);

// Booking Endpoints 
app.use("/api/bookings", bookingRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

module.exports = app;