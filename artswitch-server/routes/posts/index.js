const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("../../controllers/posts");

router.route("/").get(getPosts).post(createPost);

router.get("/:id", () => {});

module.exports = router;
