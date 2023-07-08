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
// router.get("/", getPostsForUser);

// Get Single Post
router.get("/:id", getSinglePost);

// Manage Comments
router.route("/comments/:id").post(createNewComment);

module.exports = router;
