const express = require("express");
const router = express.Router();
const { searchForUser, getUserDetails } = require("../../controllers/user");

router.get("/", searchForUser);
router.route("/profile").get(getUserDetails);
router.post("/user/follow");

module.exports = router;
