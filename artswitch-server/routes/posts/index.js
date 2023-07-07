const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  getSinglePost,
} = require("../../controllers/posts");
const { createNewComment } = require("../../controllers/comments");

// Manage Posts
router.post("/", createPost);
router.delete("/", deletePost);

// Get Single Post
router.get("/:id", getSinglePost);

// TODO: Add likes and unlike functionality

// Manage Comments
router.route("/comments/:id").post(createNewComment);

module.exports = router;
