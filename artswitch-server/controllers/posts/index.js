const {
  isValidObjectId,
  isNotValidPostsRequestBody,
} = require("../../utils/functions");
const Posts = require("../../models/posts");
const asyncHandler = require("express-async-handler");

// @desc Create a post
// @access Public
const createPost = asyncHandler(async (req, res) => {
  const requestBody = req.body;

  if (isNotValidPostsRequestBody(requestBody)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  try {
    const newPost = await Posts.create({
      ...requestBody,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating post" });
  }
});

// @desc Get a single post
// @access Public
const getSinglePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  if (!postId || !isValidObjectId(postId)) {
    return res.status(400).message({ message: "Invalid Post Id" });
  }

  try {
    const post = await Posts.findOne({ _id: { $eq: postId.toString() } });

    return res.status(200).json({
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching post" });
  }
});

// @desc Get all posts by a user
// @access Public
const getUserPosts = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;

  if (!userId || !isValidObjectId(userId)) {
    return res.status(400).message({ message: "Invalid Post Id" });
  }

  try {
    const userPosts = await Posts.find({ userId: { $eq: userId.toString() } });

    return res.status(200).json({
      message: "User's Post fetched successfully",
      data: userPosts,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts" });
  }
});

// @desc Delete a post
// @access Public
const deletePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.body;

  if (!postId || !isValidObjectId(postId)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  try {
    const postToDelete = await Posts.findOneAndDelete({ _id: postId });

    return res.status(200).json({
      message: "Post deleted successfully",
      data: postToDelete,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = {
  createPost,
  deletePost,
  getUserPosts,
  getSinglePost,
};
