const express = require("express");
const router = express.Router();
const { getPostsByTag, createPost } = require("../../controllers/posts");

router.get("/", getPostsByTag);
router.post("/", createPost);

router.get("/all", () => {});
router.get("/:id", () => {});

module.exports = router;
