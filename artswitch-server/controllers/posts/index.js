const asyncHandler = require("express-async-handler");

const getPostsByTag = asyncHandler(async (req, res) => {
  const { tag } = req.query;
  res.status(200).json({ message: `Posts with tag ${tag}` });
});

module.exports = { getPostsByTag };
