const Chat = require("../../models/chat");
const User = require("../../models/user");
const Message = require("../../models/message");
const asyncHandler = require("express-async-handler");
const { isValidObjectId, isValidString } = require("../../utils/functions");

const handleUserMessage = async data => {
  const { content, id, userId } = data;

  if (!isValidString(content)) return null;

  if (!isValidObjectId(id) || !isValidObjectId(id)) return null;

  let message = await Message.create({
    content,
    chat: id,
    sender: userId,
  });

  message = await message.populate("chat");
  message = await User.populate(message, {
    path: "chat.users",
    select: "_id name profilePicture name",
  });

  await Chat.findByIdAndUpdate(id, {
    latestMessage: message._id,
  });

  return { message, id };
};

const sendMessageToChat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const { _id } = req.user;

  if (!isValidString(content))
    return res.status(400).json({ message: "Invalid message content" });

  if (!isValidObjectId(id) || !isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    let message = await Message.create({
      content,
      chat: id,
      sender: _id,
    });

    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "_id",
    });

    await Chat.findByIdAndUpdate(id, {
      latestMessage: message._id,
    });

    res.status(201).json({
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Error sending message" });
  }
});

const getAllMessagesInChat = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    await Message.find(
      {
        chat: id,
      },
      {
        __v: 0,
      }
    ).then(messages =>
      res.status(200).json({
        message: "Messages fetched successfully",
        data: messages,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Error fetching all messages" });
  }
});

module.exports = {
  sendMessageToChat,
  getAllMessagesInChat,
  handleUserMessage,
};
