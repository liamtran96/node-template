const jwt = require("jsonwebtoken");
const {
  secret,
  accessTokenExpiration,
  refreshTokenExpiration,
} = require("../config/auth");

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, secret, {
    expiresIn: accessTokenExpiration,
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, secret, {
    expiresIn: refreshTokenExpiration,
  });
}

module.exports = { generateAccessToken, generateRefreshToken };
