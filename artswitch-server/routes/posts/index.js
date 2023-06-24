const express = require("express");
const router = express.Router();
const { getPostsByTag } = require("../../controllers/posts");

router.get("/", getPostsByTag);
router.get("/all", () => {});
router.get("/:id", () => {});

module.exports = router;
