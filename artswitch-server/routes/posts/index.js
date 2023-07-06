const express = require("express");
const router = express.Router();
const { createNewComment } = require("../../controllers/comments");
const { createPost, getPosts, deletePost } = require("../../controllers/posts");

// Manage Posts
router.route("/").get(getPosts).post(createPost).delete(deletePost);

// Get Single Post
router.get("/:id", () => {});

// Manage Comments on post
router.route("/comments").post(createNewComment);

module.exports = router;
