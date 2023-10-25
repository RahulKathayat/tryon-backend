const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const createOrderForUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  let userBody = req.body;
  console.log('userbody==============================', userBody);
  const data = await orderService.createOrderForUser(userBody, userId);
  if (data) {
    await res.status(200).send({ message: 'order created successfully' });
  } else {
    await res.status(404).send({ message: 'order not created' });
  }
});
const createOrder = catchAsync(async (req, res) => {
  let userBody = req.body;
  console.log('userbody==============================', userBody);
  const data = await orderService.createOrder(userBody);
  if (data) {
    await res.status(200).send({ message: 'order created successfully' });
  } else {
    await res.status(404).send({ message: 'order not created' });
  }
});

const getOrder = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await orderService.getOrder(query, options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'order data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getOrderById = catchAsync(async (req, res) => {
  const data = await orderService.getOrderById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'order data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateOrderForUser = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params;
    const newData = req.body;
    const updatedUser = await orderService.updateOrderForUser(userId, newData, id);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'order updated successfully' });
    } else {
      res.status(404).send({ message: 'order not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});
const updateOrder = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    console.log('USERiD========================', userId, newData);
    const updatedUser = await orderService.updateOrderById(userId, newData);
    console.log('UPDATEuSER============================', updatedUser);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'order updated successfully' });
    } else {
      res.status(404).send({ message: 'order not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteOrder = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await orderService.deleteOrderById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'order deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});

const getOrderForUser = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await orderService.getOrderForUser(query, options, userId);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'order data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const deleteOrderForUser = catchAsync(async (req, res) => {
  const querry = req.params;
  const userId = req.user.id;

  const deleteUser = await orderService.deleteOrderById(querry, userId);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'order deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});

module.exports = {
  createOrder,
  deleteOrder,
  getOrder,
  updateOrder,
  getOrderById,
  getOrderForUser,
  createOrderForUser,
  updateOrderForUser,
  deleteOrderForUser
};
