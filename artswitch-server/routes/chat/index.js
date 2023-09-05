const { Router } = require("express");
const router = Router();
const {
  getAllUserChats,
  accessChatWithUser,
} = require("../../controllers/chat");
const {
  sendMessageToChat,
  getAllMessagesInChat,
} = require("../../controllers/messages");

router.route("/").get(getAllUserChats).post(accessChatWithUser);
router.route("/:id").post(sendMessageToChat).get(getAllMessagesInChat);

module.exports = router;
