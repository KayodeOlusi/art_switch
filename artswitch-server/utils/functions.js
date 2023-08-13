const mongoose = require("mongoose");
const { shuffle } = require("lodash");

const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

const isNotValidPostsRequestBody = body => {
  const { caption } = body;

  if (!caption) return true;

  return false;
};

const prepareJSONResponse = args => {
  return { ...args };
};

const shuffleArray = array => shuffle(array);

module.exports = {
  shuffleArray,
  prepareJSONResponse,
  isValidObjectId,
  isNotValidPostsRequestBody,
};
