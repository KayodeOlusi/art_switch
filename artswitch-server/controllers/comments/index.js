const Posts = require("../../models/posts");
const Comments = require("../../models/comments");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../../utils/functions");

// @desc Update Post with new comment
// @access PRIVATE
const addCommentToPost = async (postId, commentId) => {
  try {
    await Posts.updateOne(
      { _id: postId.toString() },
      {
        $push: {
          comments: {
            $each: [commentId],
          },
        },
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not update post with comment" });
  }
};

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

    await addCommentToPost(postId, newComment._id);

    res.status(201).json({
      message: "Comment saved successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment to post" });
  }
});

module.exports = {
  createNewComment,
};
