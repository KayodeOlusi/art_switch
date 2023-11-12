const Follow = require("../../models/follow");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../../utils/functions");

const getUserProfile = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  try {
    const user = await User.findById(user_id, {
      __v: 0,
      updatedAt: 0,
      password: 0,
    });
    return res.status(200).json({
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch user" });
  }
});

// @desc get user details
const getUserDetails = asyncHandler(async (req, res) => {
  const { username } = req.query;

  if (!username) return res.status(400).json({ message: "Invalid request" });

  try {
    const userDetails = await User.aggregate([
      { $match: { username } },
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
      data: {
        ...userDetails[0],
        "follow-details": userDetails[0]["follow-details"][0],
      },
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

const getUsersForSuggestion = asyncHandler(async (req, res) => {
  const user_id = req.user._id;

  try {
    const suggestions = await Follow.aggregate([
      {
        $match: {
          $and: [{ user: { $ne: user_id } }, { followers: { $ne: user_id } }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $unwind: {
          path: "$user_details",
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: "$user_details._id",
          name: "$user_details.name",
          username: "$user_details.username",
          profilePicture: "$user_details.profilePicture",
        },
      },
    ]);

    return res.status(200).json({
      message: "Suggested users fetched successfully",
      data: shuffleArray(suggestions),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching suggested users" });
  }
});

const editUserProfile = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const { image } = req.body;

  try {
    const user = await User.findByIdAndUpdate(user_id, {
      profilePicture: image,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User profile updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile" });
  }
});

module.exports = {
  searchForUser,
  getUserDetails,
  getUserProfile,
  editUserProfile,
  getUsersForSuggestion,
};
