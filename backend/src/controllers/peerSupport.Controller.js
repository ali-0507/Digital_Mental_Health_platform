const Post = require("../models/PeerSupport.Post");
const Comment = require("../models/PeerSupport.Comment");


// Get all posts (public)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 })
      .lean();  //  return plain JS objects for easier merging


       const postIds = posts.map((p) => p._id);
    const comments = await Comment.find({ post: { $in: postIds } })
      .populate("author", "name role")
      .sort({ createdAt: 1 })
      .lean();

    // Group comments by postId
    const commentsByPost = {};
    comments.forEach((c) => {
      const pid = c.post.toString();
      if (!commentsByPost[pid]) commentsByPost[pid] = [];
      commentsByPost[pid].push(c);
    });

    // Attach comments array to each post
    const postsWithComments = posts.map((p) => ({
      ...p,
      comments: commentsByPost[p._id.toString()] || [],
    }));

    return res.json({threads : postsWithComments});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create a post (protected)
exports.createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;
    if (!content) return res.status(400).json({ message: "Content required" });

    const newPost = await Post.create({
      author: req.user._id,
      authorType: req.user.role === "admin" ? "Moderator" : "User",
      content,
      tags,
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Upvote post (protected)
exports.upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.upvotes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Report post (protected)
exports.reportPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.reports += 1;
    if (post.reports >= 3) post.isFlagged = true; // simple moderation rule
    await post.save();
    res.json({ message: "Post reported", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Add comment (protected)
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    if (!content) return res.status(400).json({ message: "Content required" });

    const comment = await Comment.create({
      post: postId,
      author: req.user._id,
      content,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Get comments for a post (public)
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("author", "name role")
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
