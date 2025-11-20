const express = require("express");
const router = express.Router();
const {markResourceViewed } = require("../controllers/resources.controller");
const {protect} = require("../middlewares/auth.js"); // auth middleware

router.post("/view", protect, markResourceViewed);

module.exports = router;
