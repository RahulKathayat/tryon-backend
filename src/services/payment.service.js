const razorpayConf = require('../config/razorpay');
const Razorpay = require('razorpay');
const secret = 'razorpaysecret';
const crypto = require('crypto');
const db = require('../models/index');
const shortid = require('shortid');

const razorpay = new Razorpay({
  key_id: razorpayConf.RAZORPAY_API_KEY,
  key_secret: razorpayConf.RAZORPAY_API_SECRET
});

// for Razorpay
const createOrderForPayment = async (amount, currency, receipt, notes) => {
  try {
    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (e.g., 100 paise for 1 INR)
      currency: 'INR', // Currency code (e.g., 'INR')
      receipt: shortid.generate(),
      notes: notes // Additional notes (if needed)
    };

    const order = await razorpay.orders.create(options);

    return order;
  } catch (error) {
    throw error;
  }
};

const createCustomer = async (customerData, res) => {
  try {
    const customer = await razorpay.customers.create(customerData);
    res.status(201).json({ message: 'Created Successfully!!' });
  } catch (error) {
    res.status(409).json({ error: 'Customer already exists' });
  }
};

const initiatePayment = async (orderId, amount, currency) => {
  try {
    const payment = await razorpay.payments.create({
      order_id: orderId,
      amount: amount,
      currency: currency
    });

    return payment;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// for webhook
const verifySignature = async (req, res) => {
  const requestBody = req.body;
  const receivedSignature = req.headers['x-razorpay-signature'];

  const calculatedSignature = calculateSignature(secret, requestBody);

  console.log('Received Signature:', receivedSignature);
  console.log('Calculated Signature:', calculatedSignature);

  if (receivedSignature === calculatedSignature) {
    console.log('Request is legit');
    res.status(200).json({
      message: 'OK'
    });
  } else {
    res.status(403).json({ message: 'Invalid' });
  }
};

function calculateSignature(secret, requestBody) {
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(requestBody));
  return shasum.digest('hex');
}
const verifyPayment = async (req, callback) => {
  // Implement the payment verification logic using Sequelize
};

module.exports = {
  createOrderForPayment,
  initiatePayment,
  verifySignature,
  createCustomer
};
