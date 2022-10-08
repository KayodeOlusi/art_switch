const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_ID, {
    expiresIn: "10d",
  });

  return token;
};

module.exports = createToken;
