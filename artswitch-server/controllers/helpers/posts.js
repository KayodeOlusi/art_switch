const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

// @access Private
const addPostToUserListOfPost = asyncHandler(async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      { $push: { posts: req.postId.toString() } }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to save post to user's list" });
  }
});

// @access Private
const removePostFromUserPostList = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const postId = req.postId;

  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { posts: postId.toString() } }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not update add post to user's list" });
  }
});

module.exports = {
  addPostToUserListOfPost,
  removePostFromUserPostList,
};
