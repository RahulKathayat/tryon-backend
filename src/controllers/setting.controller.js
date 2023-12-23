const catchAsync = require('../utils/catchAsync');
const settingService = require('../services/setting.service');
const httpStatus = require('http-status');

const getSetting = catchAsync(async (req, res) => {
  const data = await settingService.getSetting();
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Setting data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateSetting = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updatedSetting = await settingService.updateSettingById(id, newData);
    console.log('up=-------------------', updateSetting);
    if (updatedSetting) {
      res.status(200).send({ data: updatedSetting, message: 'Setting updated successfully' });
    } else {
      res.status(404).send({ message: 'Setting not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteSetting = catchAsync(async (req, res) => {
  console.log('req-----------------------------', req.query.id);
  const deleteUser = await settingService.deleteSettingById(req.query.id);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'Setting deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in Coupon delete' });
  }
});

async function createSetting(req, res) {
  try {
    const data = await settingService.createSetting(req.body);
    if (data) {
      res.status(200).send({ message: 'Setting created successfully' });
    } else {
      res.status(400).send({ message: 'Setting not created ' });
    }
  } catch (error) {
    console.log('ero------------------', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteSetting,
  getSetting,
  updateSetting,
  createSetting
};
