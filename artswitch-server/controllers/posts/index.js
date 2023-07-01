const Posts = require("../../models/posts");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const { isNotValidPostsRequestBody } = require("../../utils/functions");

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

    try {
      const postUser = await User.findById(req.user._id);
      postUser.posts.push(newPost._id);
      await postUser.save();

      return res
        .status(201)
        .json({ message: "Post created successfully", data: newPost });
    } catch (error) {
      return res.status(500).json({ message: "Error creating post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

const getPosts = asyncHandler(async (_, res) => {
  try {
    const posts = await Posts.find();
    return res.status(200).json({ message: "All Posts", data: posts });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts" });
  }
});

module.exports = { getPosts, createPost };
