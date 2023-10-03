const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService, cartService, emailService, wishlistService } = require('../services');
const config = require('../config/config');

const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const cartData = await cartService.createCart(user.id);
  const wishlistData = await wishlistService.createWishlist(user.id);

  // const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  // const host = config.email.customerHost;
  // await emailService.sendVerificationEmail(req.body.email, verifyEmailToken, host);
  res.status(200).send({ message: 'register successfully', user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  if (user) {
    const data = await cartService.createCart(user.id);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ message: 'Login Successfully!!', user, tokens });
  } else {
    res.send({ message: 'Invalid email or password', user, tokens });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const generatePassword = catchAsync(async (req, res) => {
  const password = await bcrypt.hash(req.query.password, 8);
  res.send({ password });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  if (!req.user.isEmailVerified) {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    if (req.user.role === 'Admin') {
      host = config.email.adminHost;
    } else if (req.user.role === 'Customer') {
      host = config.email.customerHost;
    }
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken, host);
    // res.status(httpStatus.NO_CONTENT).send();
    res.send('Verification Email is sent successfully!!');
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'Email already verified');
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  if (req.body.role === 'Admin') {
    host = config.email.adminHost;
  } else if (req.body.role === 'Customer') {
    host = config.email.customerHost;
  }
  const data = await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken, host);
  // res.status(httpStatus.NO_CONTENT).send();
  res.send({ message: 'Email sent successfully!!' });
});

const resetPassword = catchAsync(async (req, res) => {
  const data = await authService.resetPassword(req.query.token, req.body.password);
  console.log('reset-password================================================', req.query.token);
  console.log('DATA******************************', data);
  // res.status(httpStatus.NO_CONTENT).send();
  res.send(data);
});

const changePassword = catchAsync(async (req, res) => {
  const userWithSecretFields = await userService.getUserWithSecretFieldsById(req.user.dataValues.id);
  const password = req.body.oldPassword;
  if (!(await bcrypt.compare(password, userWithSecretFields.password))) {
    res.status(httpStatus.FORBIDDEN).send({ message: 'Incorrect password!' });
  } else {
    const userBody = {
      password: await bcrypt.hash(req.body.newPassword, 8)
    };
    await userService.updateUserById(req.user.dataValues.id, userBody);
  }
  res.status(httpStatus.OK).send({ message: 'Password Changed Successfully' });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  generatePassword,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword
};
