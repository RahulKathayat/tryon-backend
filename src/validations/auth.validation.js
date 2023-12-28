const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    role: Joi.string().required().valid('Admin', 'Customer')
  })
};

const loginWithGoogle = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    gAuth: Joi.string().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    clientId: Joi.string().optional(),
    credential: Joi.string().optional()
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const generatePassword = {
  query: Joi.object().keys({
    password: Joi.string().required()
  })
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    role: Joi.string().valid('Customer', 'Admin')
  })
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required()
  }),
  body: Joi.object().keys({
    password: Joi.string().required()
  })
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
  })
};

module.exports = {
  login,
  logout,
  refreshTokens,
  register,
  generatePassword,
  forgotPassword,
  resetPassword,
  changePassword,
  loginWithGoogle
};
