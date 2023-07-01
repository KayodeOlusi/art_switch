const {
  isValidObjectId,
  isNotValidPostsRequestBody,
} = require("../../utils/functions");
const User = require("../../models/user");
const Posts = require("../../models/posts");
const asyncHandler = require("express-async-handler");

// @access Private
const addPostToUserListOfPost = asyncHandler(async (userId, postId) => {
  try {
    const createdPostUser = await User.findById(userId);
    createdPostUser.posts.push(postId);
    await createdPostUser.save();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});

// @access Private
const removePostFromUserPostList = asyncHandler(async (userId, postId) => {
  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { posts: postId.toString() } }
    );

    return true;
  } catch (error) {
    return false;
  }
});

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
    const updateUserPostList = await addPostToUserListOfPost(
      req.user._id,
      newPost._id
    );

    if (!updateUserPostList) {
      return res.status(400).json({ message: "Error creating post" });
    }

    return res.status(201).json({
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// @desc Get all posts
// @access Public
const getPosts = asyncHandler(async (_, res) => {
  try {
    const posts = await Posts.find();
    return res.status(200).json({ message: "All Posts", data: posts });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts" });
  }
});

// @desc Delete a post
// @access Public
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id || !isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  try {
    const postToDelete = await Posts.findOneAndDelete({ _id: id });
    const deletePostFromUserPostList = await removePostFromUserPostList(
      req.user._id,
      id
    );

    if (!deletePostFromUserPostList)
      return res.status(500).json({ message: "Error deleting post" });

    return res.status(200).json({
      message: "Post deleted successfully",
      data: postToDelete,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = { getPosts, createPost, deletePost };
