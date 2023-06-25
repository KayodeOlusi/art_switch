const Posts = require("../../models/posts");
const asyncHandler = require("express-async-handler");
const { isValidPostsRequestBody } = require("../../utils/functions");

const createPost = asyncHandler(async (req, res) => {
  const requestBody = req.body;

  if (!isValidPostsRequestBody(requestBody))
    return res.status(400).json({ message: "Invalid request body" });

  try {
    const newPost = await Posts.create({
      ...requestBody,
      userId: req.user._id,
    });

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

const getPostsByTag = asyncHandler(async (req, res) => {
  const { tag } = req.query;

  if (!tag) return res.status(400).json({ message: "Tag is required" });

  res.status(200).json({ message: `Posts with tag ${tag}` });
});

module.exports = { getPostsByTag, createPost };
