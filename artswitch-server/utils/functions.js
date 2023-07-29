const mongoose = require("mongoose");

const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

const isNotValidPostsRequestBody = body => {
  const { caption } = body;

  if (!caption) return true;

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
