const User = require("../../models/User");
const asyncHandler = require("express-async-handler");

// @desc follow a user
const followUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // TODO: re-structure controller and extract follow to a different model
  if (!userId || !isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid User Id" });
  }

  try {
    await User.updateOne(
      { _id: { $eq: userId } },
      { $push: { followers: req.user._id } }
    );

    // don't send response as json back to client
    // return res.status(200).json({
    //   message: "User followed successfully",
    //   data: user,
  } catch (error) {}
});
