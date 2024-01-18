const jwt = require("jsonwebtoken");

const generateToken = (payload, expired) => {
  return jwt.sign(payload, "secretttt", { expiresIn: expired });
};

module.exports = generateToken;
