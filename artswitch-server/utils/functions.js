const isNotValidPostsRequestBody = body => {
  const { caption, userId } = body;

  if (!caption || !userId) return true;

  return false;
};

module.exports = {
  isNotValidPostsRequestBody,
};
