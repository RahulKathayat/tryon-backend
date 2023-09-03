const catchAsync = require('../utils/catchAsync');
const {
  commonService,
  userService
} = require('../services');

const getAll = catchAsync(async (req, res) => {
  const tableName=req.params.name; 
  console.log('Table Name:',tableName);
  const result = await commonService.getAll(tableName);
  console.log(result);
  res.send(result);
});

const saveUserSettings = catchAsync(async (req, res) => {

  const result = await userService.updateUserById(req);
  console.log(result);
  res.send(result);
});
const getUserSettings = catchAsync(async (req, res) => {
const userId = req.user?.dataValues.id? req.user.dataValues.id:1;
  const result = await userService.getUserById(userId);
  console.log(result);
  res.send(result);
});
module.exports = {
  getAll,
  saveUserSettings,
  getUserSettings
};
