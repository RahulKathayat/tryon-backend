const catchAsync = require('../utils/catchAsync');
const orderDetailsService = require('../services/orderDetails.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Op } = require('sequelize');

const createOrderDetails = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await orderDetailsService.createOrderDetails(userBody);
  if (data) {
    await res.status(200).send({ message: 'order detail created successfully' });
  } else {
    await res.status(404).send({ message: 'order detail not created' });
  }
});

const getOrderDetails = catchAsync(async (req, res) => {
  let query = {};
  query.status = req.query.status ? req.query.status : true;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const filterParameters = ['type', 'amount', 'trackingId', 'trackingLink'];

  filterParameters.forEach((param) => {
    if (req.query[param]) {
      if (req.query[param].includes(',')) {
        const values = req.query[param].split(',');
        query[param] = {
          [Op.or]: values.map((value) => ({
            [Op.like]: `%${value.trim()}%`
          }))
        };
      } else {
        query[param] = {
          [Op.like]: `%${req.query[param]}%`
        };
      }
    }
  });

  const data = await orderDetailsService.getOrderDetails(query, options);

  if (data) {
    res.status(httpStatus.OK).send({ message: 'order data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
});

const getOrderDetailsByOrderId = catchAsync(async (req, res) => {
  const data = await orderDetailsService.getOrderDetailsByOrderId(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'order data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});
const getOrderDetailsById = catchAsync(async (req, res) => {
  const data = await orderDetailsService.getOrderDetailsById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'order data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateOrderDetails = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await orderDetailsService.updateOrderDetailsById(userId, newData);

    res.status(200).send({ data: updatedUser, message: 'order updated successfully' });
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteOrderDetails = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await orderDetailsService.deleteOrderDetailsById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'order deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});

// For Users

const getOrderDetailsForUser = catchAsync(async (req, res) => {
  let query = {};
  query.status = req.query.status ? req.query.status : true;
  const userId = req.user.id;
  const data = await orderDetailsService.getOrderDetailsForUser(query, userId);

  if (data) {
    res.status(httpStatus.OK).send({ message: 'order data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
});

// cancel order
const manageOrder = catchAsync(async (req, res) => {
  const orderDetailId = req.params.orderDetailId;
  const body = req.body;
  const data = await orderDetailsService.manageOrder(orderDetailId, body);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Order Type updated successfully', data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in updating data' });
  }
});

module.exports = {
  createOrderDetails,
  deleteOrderDetails,
  getOrderDetails,
  updateOrderDetails,
  getOrderDetailsById,
  getOrderDetailsForUser,
  getOrderDetailsByOrderId,
  manageOrder
};
