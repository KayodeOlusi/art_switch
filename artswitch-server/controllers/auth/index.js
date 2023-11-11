const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const createToken = require("../../config/auth/createToken");

// @desc Signup
// @access Public
// @route POST/auth
const Signup = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicture, username } = req.body;

  if (!name || !email || !password || !username)
    return res.status(400).json({ message: "Please fill in all fields" });

  const duplicateUser = await User.findOne({ email });
  if (duplicateUser)
    return res.status(400).json({ message: "User already exists" });

  try {
    const user = await User.create({
      name,
      email,
      password,
      profilePicture,
      username,
    });
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: createToken(user._id),
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create user" });
  }
});

// @desc Login
// @access Public
// @route POST/auth
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please fill in all fields" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User does not exist" });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword)
    return res.status(400).json({ message: "Invalid credentials" });

  return res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    token: createToken(user._id),
    profilePicture: user.profilePicture,
  });
});

const VerifyToken = asyncHandler(async (req, res) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ") || !authHeader)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_ID);

    if (decodedToken && decodedToken.exp * 1000 < new Date().getTime())
      return res.status(401).json({ message: "Unauthorized" });

    return res.status(200).json({ message: "Authorized" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = {
  Login,
  Signup,
  VerifyToken,
};
