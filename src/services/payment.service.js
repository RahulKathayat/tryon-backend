const { Payment } = require('../models');
const razorpayConf = require('../config/razorpay');
const Razorpay = require('razorpay');
const secret = "razorpaysecret";
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: razorpayConf.key_id,
  key_secret: razorpayConf.key_secret
});

const createPayment = async (_userBody) => {
  const userBody = _userBody;
  return Payment.create(userBody);
};

const getPayment = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Payment.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    offset
  });
  return support;
};

const getPaymentById = async (id) => {
  try {
    const data = await Payment.findAll({
      where: { id: id }
    });
    return data;
  } catch (error) {
    console.error('payment not found!!', error);
  }
};

const updatePaymentById = async (id, newData) => {
  const findData = await Payment.findOne({
    where: id
  });
  if (findData) {
    return Payment.update(newData, { where: id });
  } else {
    return;
  }
};

const deletePaymentById = async (Id) => {
  try {
    const user = await Payment.findOne({ where: Id });

    if (!user) {
      throw new Error('Payment not found');
    }
    await user.update({ status: false });

    console.log('Payment deleted successfully');

    return { message: 'Payment deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// for Razorpay
const createOrderForPayment = async (amount, currency, receipt, notes) => {
  try {
    const options = {
      amount: amount, // Amount in the smallest currency unit (e.g., 100 paise for 1 INR)
      currency: currency, // Currency code (e.g., 'INR')
      receipt: receipt, // Unique order ID or receipt number
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
    res.status(201).json({ message: "Created Successfully!!" });
  } catch (error) {
    res.status(409).json({ error: "Customer already exists" });
    // if (error.code === 'customer_exists') {
    //   res.status(409).json({ error: "Customer already exists" });
    // } else {
    //   res.status(500).json({ error: "Internal Server Error" });
    // }
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
const verifySignature=async(req,res)=>{
  const requestBody = req.body;
  const receivedSignature = req.headers["x-razorpay-signature"];

  const calculatedSignature = calculateSignature(secret, requestBody);

  console.log('Received Signature:', receivedSignature);
  console.log('Calculated Signature:', calculatedSignature);

  if (receivedSignature === calculatedSignature) {
    console.log("Request is legit");
    res.status(200).json({
      message: "OK",
    });
  } else {
    res.status(403).json({ message: "Invalid" });
  }
};

function calculateSignature(secret, requestBody) {
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(requestBody));
  return shasum.digest("hex");
}

module.exports = {
  createPayment,
  getPayment,
  updatePaymentById,
  deletePaymentById,
  getPaymentById,
  createOrderForPayment,
  initiatePayment,
  verifySignature,
  createCustomer

};
