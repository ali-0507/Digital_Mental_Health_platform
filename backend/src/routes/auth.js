const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");
const { protect } = require("../middlewares/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", protect, authController.me);

module.exports = router;
