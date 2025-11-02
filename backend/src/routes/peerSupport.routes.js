const express = require("express");
const router = express.Router();
const peerSupportController = require("../controllers/peerSupport.Controller");
const {protect} = require('../middlewares/auth');


// public 
router.get("/", peerSupportController.getPosts);
router.get("/:id/comments", peerSupportController.getComments);

// protected
router.post("/",protect, peerSupportController.createPost);
router.post("/:id/upvote", protect, peerSupportController.upvotePost);
router.post("/:id/report", protect, peerSupportController.reportPost);
router.post("/:id/comment", protect, peerSupportController.addComment);

module.exports = router;