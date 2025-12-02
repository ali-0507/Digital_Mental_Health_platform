const express = require("express");
const router = express.Router();
const {chatWithAI} = require("../controllers/AIChat.controller");
const {protect} = require("../middlewares/auth");
const AIChatController = require("../controllers/AIChat.controller");


router.post("/",chatWithAI);

// save chats in DB
router.post("/save", protect, AIChatController.saveChat);

// Get all saved chats for user
router.get("/my-chats", protect, AIChatController.getUserChats);

// get chat + delete chat
router.get("/:id", protect, AIChatController.getChatById);
router.delete("/:id", protect, AIChatController.deleteChat);

module.exports = router;