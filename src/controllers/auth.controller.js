const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService,cartService, emailService} = require('../services');
const config = require('../config/config');


const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const data = await cartService.createCart(user.id);

  const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
  const host = config.email.customerHost;
  await emailService.sendVerificationEmail(req.body.email, verifyEmailToken, host);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  if(user){
    // console.log("userIDDDDDDDDDDDDDDDDDDD",user.id);
    // const data = await cartService.createCart(user.id);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({message: "Login Successfully!!",user,tokens})
}
  else{
    res.send({ message:"Invalid email or password",user, tokens });
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
    let host = config.email.customerHost;
    if (req.user.role === 'Admin') {
      host = config.email.AdminHost;
    } else if (req.user.role === 'Customer') {
      host = config.email.CustomerHost;
    }
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken, host);
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'Email already verified');
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  generatePassword,
  sendVerificationEmail,
  verifyEmail
};
