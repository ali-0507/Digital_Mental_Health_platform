const express = require("express");
const router = express.Router();
const {chatWithAI} = require("../controllers/AIChat.controller");
const {protect} = require("../middlewares/auth");
const AIChatController = require("../controllers/AIChat.controller");


router.post("/",/*protect, */chatWithAI);

// save chats in DB
// Save chat
router.post("/save", protect, AIChatController.saveChat);

// Get all saved chats for user
router.get("/my-chats", protect, AIChatController.getUserChats);

module.exports = router;