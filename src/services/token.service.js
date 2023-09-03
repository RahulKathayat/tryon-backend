const jwt = require('jsonwebtoken');
const moment = require('moment');
// const httpStatus = require('http-status');
const config = require('../config/config');
const { Token } = require('../models');
// const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

const generateToken = (userId, role, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    role,

    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, role, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    role,
    expires: expires.toDate(),
    type,
    blacklisted
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ where: { token, type, user: payload.sub, blacklisted: false } });
  console.log("token-------------",tokenDoc)
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, user.role, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, user.role, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, user.id, user.role, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens
};
