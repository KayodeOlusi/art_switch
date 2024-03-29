const Chat = require("../../models/chat");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("../../utils/functions");

// @desc Access chat with a specific user
// @route POST /api/chat
const accessChatWithUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    let chat = await Chat.findOne({
      users: { $all: [userId, req.user._id] },
    })
      .populate("users", "-password")
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "-password",
    });

    if (chat) {
      return res.status(200).json({
        message: "Chat found",
        data: chat,
      });
    } else {
      let chatToCreate = {
        users: [userId, req.user._id],
        chat: userId,
      };

      try {
        const newChat = await Chat.create(chatToCreate);
        const fullChat = await Chat.findById(newChat._id).populate(
          "users",
          "-password"
        );

        res.status(201).json({
          message: "Chat created successfully",
          data: fullChat,
        });
      } catch (error) {
        return res.status(500).json({
          message: error?.message || "Unable to create chat, try again later",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
});

// @desc Get all chats for a user
// @route GET /api/chat
const getAllUserChats = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const chats = await Chat.aggregate([
      {
        $match: {
          users: {
            $in: [_id],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $project: {
          __v: 0,
          createdAt: 0,
          "users.__v": 0,
          "users.password": 0,
        },
      },
    ]);

    await Chat.populate(chats, {
      path: "latestMessage",
      select: "-__v -chat -createdAt -updatedAt",
    });

    await User.populate(chats, {
      path: "latestMessage.sender chat",
      select: "-password -__v -createdAt -updatedAt -email",
    });

    return res.status(200).json({
      message: "Chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Unable to fetch all chats" });
  }
});

module.exports = {
  accessChatWithUser,
  getAllUserChats,
};
