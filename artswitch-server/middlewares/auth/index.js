const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

const verifyJWT = asyncHandler(async (req, res, next) => {
  let token;
  const auth_header = req.headers.authorization || req.headers.Authorization;

  if (!auth_header?.startsWith("Bearer ") || !auth_header)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    token = auth_header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_ID);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = { verifyJWT };
