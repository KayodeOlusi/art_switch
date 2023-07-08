const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  getSinglePost,
  getPostsForExplore,
} = require("../../controllers/posts");
const { createNewComment } = require("../../controllers/comments");

// Manage Posts
router.post("/", createPost);
router.delete("/", deletePost);
// router.get("/", getPostsForUser);
router.get("/explore", getPostsForExplore);

// Get Single Post
router.get("/:id", getSinglePost);

// Manage Comments
router.route("/comments/:id").post(createNewComment);

module.exports = router;
