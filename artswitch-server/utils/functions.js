const mongoose = require("mongoose");

const isNotValidPostsRequestBody = body => {
  const { caption, userId } = body;

  if (!caption || !userId || !mongoose.Types.ObjectId.isValid(userId))
    return true;

  return false;
};

const prepareJSONResponse = args => {
  return { ...args };
};

module.exports = {
  isNotValidPostsRequestBody,
  prepareJSONResponse,
};
