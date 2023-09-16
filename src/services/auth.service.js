const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    console.log('user id ========', user);

    if (user == null) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    const userWithSecretFields = await userService.getUserWithSecretFieldsById(user.id);
    console.log('password', password);
    console.log('userWithSecretFields', userWithSecretFields);
    logger.info('message');

    if (!user || !(await bcrypt.compare(password, userWithSecretFields.password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    return user;
  } catch (error) {
    console.error('Error in loginUserWithEmailAndPassword:', error);
    throw error;
  }
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};


/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    // await Token.destroy({ where: { user: user.id, type: tokenTypes.VERIFY_EMAIL }, force: true });
    await userService.updateUserById(user.id, { emailVerify: true });
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    if (!resetPasswordTokenDoc) {
      throw new Error('Invalid or expired reset password token');
    }

    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error('User not found');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 8);
    const updatedUser = await userService.updateUserById(user.id, { password: newHashedPassword });

    if (updatedUser) {
      return {message:'Password reset successfully'};
    } else {
      throw new Error('Password reset failed');
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message || 'Password reset failed');
  }
};



module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  verifyEmail,
  resetPassword
};
