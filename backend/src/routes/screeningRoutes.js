const express = require("express");
const router = express.Router();
const { protect, protectOptional } = require("../middlewares/auth");
const screeningController = require("../controllers/screeningController");


router.post("/", protect, screeningController.saveScreening);
router.get("/", protect, screeningController.getUserScreenings);
router.get("/questions",protectOptional,screeningController.getQuestions);
router.delete("/", protect,screeningController.clearHistory);
router.delete("/:id", protect, screeningController.deleteOneScreening);

module.exports = router;
