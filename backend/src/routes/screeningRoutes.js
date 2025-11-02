const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const screeningController = require("../controllers/screeningController");

router.post("/", protect, screeningController.saveScreening);
router.get("/", protect, screeningController.getUserScreenings);

module.exports = router;
