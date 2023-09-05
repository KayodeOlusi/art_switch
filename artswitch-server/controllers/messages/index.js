const Message = require("../../models/message");
const asyncHandler = require("express-async-handler");
const { isValidObjectId, isValidString } = require("../../utils/functions");
const Chat = require("../../models/chat");

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
    const message = await Message.create({
      content,
      chat: id,
      sender: _id,
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
    await Message.find({
      chat: id,
    })
      .populate("sender", "-password", "-__v")
      .sort({ createdAt: -1 })
      .then(messages =>
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
};
