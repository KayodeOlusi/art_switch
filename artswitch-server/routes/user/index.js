const express = require("express");
const router = express.Router();
const { searchForUser } = require("../../controllers/user");

router.get("/", searchForUser);
router.patch("/profile");
router.patch("/user/follow");

module.exports = router;
