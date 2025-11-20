const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/auth");
const {getMyDashboard} = require("../controllers/User.Dashboard");
 

router.get("/me", protect, getMyDashboard);

module.exports = router;