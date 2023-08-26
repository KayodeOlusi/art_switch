const Comments = require("../../models/comments");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../../utils/functions");

// @desc Create a comment
// @access PUBLIC
const createNewComment = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const { comment, user } = req.body;

  if (!comment || !isValidObjectId(postId) || !isValidObjectId(user)) {
    return res.status(400).json({ message: "Validation Error" });
  }

  try {
    const newComment = await Comments.create({
      comment,
      postId,
      user,
    });

    return res.status(201).json({
      message: "Comment saved successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment to post" });
  }
});

const getAllCommentsInAPost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;

  if (!isValidObjectId(postId)) {
    return res.status(400).json({ message: "Invalid Post Id" });
  }

  try {
    const comments = await Comments.find(
      { postId },
      {
        __v: 0,
        updatedAt: 0,
      }
    )
      .populate("user", "-password -createdAt -updatedAt -__v")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching comments" });
  }
});

module.exports = {
  createNewComment,
  getAllCommentsInAPost,
};
