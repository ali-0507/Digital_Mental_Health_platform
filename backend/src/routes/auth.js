const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const { protect } = require("../middlewares/auth");

// public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// refresh & logout
router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

// profile route
router.get("/me", protect, authController.me);

module.exports = router;
