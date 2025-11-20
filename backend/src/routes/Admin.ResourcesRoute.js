const express = require("express");
const router = express.Router();
const resourcesController = require("../controllers/Admin.Resources");


router.get("/", resourcesController.listPublic);

module.exports = router;