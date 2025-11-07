const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { protect } = require("../middlewares/auth");

// POST /api/bookings → Create a booking
router.post("/", protect, bookingController.createBooking);
// router.get("/", protect, bookingController.getMyBookings);

module.exports = router;