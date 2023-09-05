const { Router } = require("express");
const router = Router();
const {
  getAllUserChats,
  accessChatWithUser,
} = require("../../controllers/chat");

router.route("/").get(getAllUserChats);
router.route("/").post(accessChatWithUser);

module.exports = router;
