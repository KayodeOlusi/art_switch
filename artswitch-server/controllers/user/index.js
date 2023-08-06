const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

// @desc get user details
const getUserDetails = asyncHandler(async (req, res) => {
  try {
    const userDetails = await User.findOne({
      _id: { $eq: req.user._id },
    }).select("-password");

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({ message: "Cannot fetch user" });
  }
});

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

    if (!searchedUsers) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({
      message: "Users found successfully",
      data: searchedUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Cannot fetch user" });
  }
});

module.exports = { followUser, searchForUser, getUserDetails };
