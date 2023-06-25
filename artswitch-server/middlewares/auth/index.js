const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

const verifyJWT = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ") || !authHeader)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_ID);
    req.user = await User.findById(decodedToken.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

module.exports = { verifyJWT };
