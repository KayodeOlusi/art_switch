const mongoose = require("mongoose");
const { shuffle } = require("lodash");

const changeSinglePostBody = post => {
  const { userId, ...rest } = post;
  return { user: userId, ...rest };
};

const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

const prepareJSONResponse = args => {
  return { ...args };
};

const shuffleArray = array => shuffle(array);

module.exports = {
  shuffleArray,
  prepareJSONResponse,
  isValidObjectId,
  changeSinglePostBody,
};
