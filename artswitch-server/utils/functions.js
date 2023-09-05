const mongoose = require("mongoose");
const { shuffle } = require("lodash");

const changeSinglePostBody = post => {
  const { userId, ...rest } = post;
  return { user: userId, ...rest };
};

const isValidString = string => {
  return typeof string === "string" && string.trim().length > 0;
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
  isValidString,
};
