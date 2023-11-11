const express = require("express");
const router = express.Router();
const { Login, Signup, VerifyToken } = require("../../controllers/auth");

router.post("/login", Login);
router.post("/signup", Signup);
router.get("/verify-token", VerifyToken);

module.exports = router;
