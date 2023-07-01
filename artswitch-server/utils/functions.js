const mongoose = require("mongoose");

const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

const isNotValidPostsRequestBody = body => {
  const { caption, userId } = body;

  if (!caption || !userId || !isNotValidPostsRequestBody(userId)) return true;

  return false;
};

const prepareJSONResponse = args => {
  return { ...args };
};

module.exports = {
  prepareJSONResponse,
  isValidObjectId,
  isNotValidPostsRequestBody,
};
