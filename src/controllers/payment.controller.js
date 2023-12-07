const catchAsync = require('../utils/catchAsync');
const paymentService = require('../services/payment.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

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

const createCustomer = catchAsync(async (req, res) => {
  const customerData = req.body;
  paymentService.createCustomer(customerData, res);
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

// for webhook interaction
const verify = catchAsync(async (req, res) => {
  paymentService.verifySignature(req, res);
});

module.exports = {
  createOrderForPayment,
  initiatePayment,
  verify,
  createCustomer
};
