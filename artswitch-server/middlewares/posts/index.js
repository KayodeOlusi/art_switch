const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../../utils/functions");

const modifyPostDetails = asyncHandler(async (req, res, next) => {
  const { postId } = req.body;
  if (!isValidObjectId(postId)) {
    return res.status(400).json({ message: "Invalid Post Id" });
  }

  req.postId = postId;

  next();
});

module.exports = modifyPostDetails;
