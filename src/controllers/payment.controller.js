const catchAsync = require('../utils/catchAsync');
const paymentService = require('../services/payment.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const createPayment = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await paymentService.createPayment(userBody);
  if (data) {
    await res.status(200).send({ message: 'payment sent successfully' });
  } else {
    await res.status(404).send({ message: 'payment not created' });
  }
});

const getPayment = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await paymentService.getPayment(query, options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'payment data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getPaymentById = catchAsync(async (req, res) => {
  const data = await paymentService.getPaymentById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'payment data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updatePayment = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await paymentService.updatePaymentById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'payment updated successfully' });
    } else {
      res.status(404).send({ message: 'payment not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deletePayment = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await paymentService.deletePaymentById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'payment deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});

//Razorpay Api's
const createOrderForPayment = catchAsync(async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    const order = await paymentService.createOrderForPayment(amount, currency, receipt, notes);
    res.status(200).json({ message: 'Razorpay Order Created', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Razorpay order', error });
  }
});

const initiatePayment = catchAsync(async (req, res) => {
  const { orderId, amount, currency } = req.body;

  try {
    const payment = await paymentService.initiatePayment(orderId, amount, currency);
    res.status(200).json({ message: 'Payment initiated', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error initiating payment', error });
  }
});

module.exports = {
  createPayment,
  deletePayment,
  getPayment,
  updatePayment,
  getPaymentById,
  createOrderForPayment,
  initiatePayment
};
