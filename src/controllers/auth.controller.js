const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService, userService } = require('../services');

// const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  if(user){
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

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  generatePassword
};
