const express = require("express");
const router = express.Router();
const { searchForUser } = require("../../controllers/user");

router.get("/user", searchForUser);
router.patch("/profile");
router.patch("/user/follow");

module.exports = router;
