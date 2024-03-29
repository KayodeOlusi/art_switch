const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  getFeedPosts,
  getUserPosts,
  getSinglePost,
  likeOrUnlikePost,
  getPostsForExplore,
} = require("../../controllers/posts");
const {
  createNewComment,
  getAllCommentsInAPost,
} = require("../../controllers/comments");

// Manage Posts
router.get("/explore", getPostsForExplore);
router.route("/").get(getFeedPosts).post(createPost).delete(deletePost);

// User Posts
router.route("/user/:id").get(getUserPosts);

// Get Single Post
router.route("/:id").get(getSinglePost).patch(likeOrUnlikePost);

// Manage Comments
router.route("/comments/:id").get(getAllCommentsInAPost).post(createNewComment);

module.exports = router;
