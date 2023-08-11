const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

// @desc get user details
const getUserDetails = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  try {
    const userDetails = await User.aggregate([
      { $match: { _id: user_id } },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "user",
          as: "follow-details",
        },
      },
      {
        $project: {
          __v: 0,
          password: 0,
          updatedAt: 0,
          "posts.__v": 0,
          "posts.userId": 0,
          "posts.updatedAt": 0,
          "follow-details.user": 0,
          "follow-details._id": 0,
          "follow-details.__v": 0,
        },
      },
    ]);

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

const searchForUser = asyncHandler(async (req, res) => {
  const { artist } = req.query;

  try {
    const searchedUsers = await User.find({
      $or: [
        { name: { $regex: artist, $options: "i" } },
        { email: { $regex: artist, $options: "i" } },
        { username: { $regex: artist, $options: "i" } },
      ],
    })
      .find({
        _id: { $ne: req.user._id },
      })
      .select("-password");

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

module.exports = { searchForUser, getUserDetails };
