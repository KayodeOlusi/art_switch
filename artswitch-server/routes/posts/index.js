const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  getSinglePost,
  getPostsForExplore,
  getFeedPosts,
} = require("../../controllers/posts");
const { createNewComment } = require("../../controllers/comments");

// Manage Posts
router.route("/").get(getFeedPosts).post(createPost).delete(deletePost);
router.get("/explore", getPostsForExplore);

// Get Single Post
router.get("/:id", getSinglePost);

// Manage Comments
router.route("/comments/:id").post(createNewComment);

module.exports = router;
