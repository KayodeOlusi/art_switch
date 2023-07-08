const User = require("../../models/user");
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

const searchForUser = asyncHandler(async (req, res) => {
  const { artist } = req.query;

  try {
    const searchedUsers = await User.find({
      $and: [
        {
          $or: [
            { name: { $regex: artist, $options: "i" } },
            { email: { $regex: artist, $options: "i" } },
          ],
        },
        { _id: { $ne: req.user._id } },
      ],
    }).select("-password");

    return res.status(200).json({
      message: "Users found successfully",
      data: searchedUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Cannot fetch users" });
  }
});

module.exports = { followUser, searchForUser };
