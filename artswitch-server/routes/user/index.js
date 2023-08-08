const express = require("express");
const router = express.Router();
const { followProcess } = require("../../controllers/user/follow");
const { searchForUser, getUserDetails } = require("../../controllers/user");

router.get("/", searchForUser);
router.route("/profile").get(getUserDetails);
router.post("/user/action", followProcess);

module.exports = router;
