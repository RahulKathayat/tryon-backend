const catchAsync = require('../utils/catchAsync');
const addressService = require('../services/address.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const createAddress = catchAsync(async (req, res) => {
  let userId = req.user.id;
  let userBody = req.body;
  await addressService.updateAllAddress(userId);
  const data = await addressService.createAddress(userBody, userId);
  if (data) {
    let id = data.dataValues.id;
    await addressService.updateAddress({ id: id });

    await res.status(200).send({ message: 'address created successfully' });
  } else {
    await res.status(404).send({ message: 'address not created' });
  }
});

const getAddressMe = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const data = await addressService.getAddressMe(userId);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'address data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getAddress = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await addressService.getAddress(query, options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'address data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getAddressById = catchAsync(async (req, res) => {
  const data = await addressService.getAddressById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'address data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateAddress = catchAsync(async (req, res) => {
  try {
    const params = req.params;
    const newData = req.body;
    const updatedUser = await addressService.updateAddressById(newData, params);
    if (updatedUser) {
      res.status(200).send({ message: 'address updated successfully' });
    } else {
      res.status(404).send({ message: 'address not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteAddress = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await addressService.deleteAddressById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'address deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in address delete' });
  }
});

module.exports = {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
  getAddressById,
  getAddressMe
};
