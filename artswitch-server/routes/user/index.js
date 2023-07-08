const express = require("express");
const router = express.Router();

router.patch("/profile");
router.patch("/user/follow");

module.exports = router;
