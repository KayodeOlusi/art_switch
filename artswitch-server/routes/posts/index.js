const express = require("express");
const router = express.Router();
const { createPost, getPosts, deletePost } = require("../../controllers/posts");

router.route("/").get(getPosts).post(createPost).delete(deletePost);

router.get("/:id", () => {});

module.exports = router;
