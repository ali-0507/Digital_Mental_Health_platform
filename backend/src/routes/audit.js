
const express = require("express");
const router = express.Router();

const { getAuditLogs } = require("../controllers/auditController");
const { protect } = require("../middlewares/auth");
const { authorize } = require("../middlewares/roles");

router.use(protect, authorize("admin"));

router.get("/logs", getAuditLogs);

module.exports = router;
