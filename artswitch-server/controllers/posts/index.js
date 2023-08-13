const Posts = require("../../models/posts");
const Follow = require("../../models/follow");
const asyncHandler = require("express-async-handler");
const { isValidObjectId, shuffleArray } = require("../../utils/functions");

// @desc Create a post
// @access Public
const createPost = asyncHandler(async (req, res) => {
  const { caption } = req.body;

  if (!caption) {
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

// @desc Get posts for explore page
// @access Public
const getPostsForExplore = asyncHandler(async (req, res) => {
  const { tag, details } = req.query;

  const fullPostDetails = !details
    ? {
        title: 0,
        caption: 0,
        likes: 0,
        userId: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    : {};

  try {
    const postsWithTags = await Posts.find(
      {
        image: { $ne: "" },
        tags: { $in: [String(tag).toLocaleLowerCase()] },
      },
      fullPostDetails
    );

    return res.status(200).json({
      message: "Posts fetched successfully",
      data: postsWithTags,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts" });
  }
});

// @access Public
// @desc Get posts based on followed users
const getFeedPosts = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  try {
    let posts = await Follow.aggregate([
      {
        $match: {
          user: user_id,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          following: 0,
          userId: 0,
          followers: 0,
        },
      },
    ]);

    console.log(posts);
    posts = shuffleArray(posts[0].posts);

    return res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);
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
  getFeedPosts,
  getUserPosts,
  getSinglePost,
  getPostsForExplore,
};
