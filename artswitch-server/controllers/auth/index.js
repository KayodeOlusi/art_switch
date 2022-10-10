const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");
const createToken = require("../../config/auth/createToken");

// @desc Signup
// @access Public
// @route POST/auth
const Signup = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  if (!name || !email || !password)
    res.status(400).json({ message: "Please fill in all fields" });

  const duplicateUser = await User.findOne({ email });
  if (duplicateUser) res.status(400).json({ message: "User already exists" });

  try {
    const user = await User.create({ name, email, password, profilePicture });
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: createToken(user._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error({ message: "Failed to create user" });
  }
});

// @desc Login
// @access Public
// @route POST/auth
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    res.status(400).json({ message: "Please fill in all fields" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User does not exist" });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) res.status(400).json({ message: "Invalid credentials" });

  try {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: createToken(user._id),
    });
  } catch (error) {
    res.status(400);
    throw new Error({ message: "Failed to login" });
  }
});

module.exports = {
  Login,
  Signup,
};
