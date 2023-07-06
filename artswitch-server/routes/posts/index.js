const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  deletePost,
  getUserPosts,
} = require("../../controllers/posts");
const { createNewComment } = require("../../controllers/comments");
const modifyPostDetails = require("../../middlewares/posts");

// Manage Posts
router.get("/", getPosts);
router.post("/", modifyPostDetails, createPost);
router.delete("/", modifyPostDetails, deletePost);

// Get Single Post
router.get("/:id", getUserPosts);

// TODO: Add likes and unlike functionality

// Manage Comments
router.route("/comments/:id").post(createNewComment);

module.exports = router;
