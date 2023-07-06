const Posts = require("../../models/posts");
const Comments = require("../../models/comments");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../../utils/functions");

// @desc Create a comment
// @access PUBLIC
const createNewComment = asyncHandler(async (req, res) => {
  const { comment, postId, authorId } = req.body;

  if (!comment || !isValidObjectId(postId) || !isValidObjectId(authorId)) {
    return res.status(400).json({ message: "Validation Error" });
  }

  try {
    const newComment = await Comments.create({
      comment,
      postId,
      authorId,
    });

    return res.status(201).json({
      message: "Comment saved successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment to post" });
  }
});

module.exports = {
  createNewComment,
};
