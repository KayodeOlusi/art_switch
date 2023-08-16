const express = require("express");
const router = express.Router();
const {
  searchForUser,
  getUserDetails,
  getUserProfile,
} = require("../../controllers/user");
const { followProcess } = require("../../controllers/user/follow");

router.get("/", searchForUser);
router.route("/details").get(getUserDetails);
router.route("/profile").get(getUserProfile);
router.post("/action", followProcess);

module.exports = router;
