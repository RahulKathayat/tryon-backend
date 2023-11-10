const { Payment, Users } = require('../models');
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
    const data = await Payment.findOne({ where: Id });

    if (!data) {
      throw new Error('Payment not found');
    }
    data.status = 0;
    await data.save();

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
    console.log('payment======================', payment);

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

// const createRazorpayOrder = async (req, callback) => {
//   try {
//     let transferArray = [];

//     for (let detail of req.body.payment_distribute_details) {
//       console.log('user details for payment:========================================= ', detail);
//       let user = await Users.findOne({ where: { email: detail.email } });

//       if (user) {
//         transferArray.push({
//           // account: user.bankAccountId,
//           amount: detail.amount * 100,
//           currency: 'INR',
//           notes: {
//             branch: '',
//             name: ' '
//           },
//           linked_account_notes: ['branch'],
//           on_hold: 1,
//           on_hold_until: 1671222870
//         });

//         // Save the payment information to your database
//         try {
//           const payment = await Payment.create({
//             userId: user.userId, // Update with the actual foreign key value
//             orderDetailId: req.body.orderDetailId, // Update with the actual order detail ID
//             status: true // You can adjust the status as needed
//           });
//         } catch (error) {
//           console.error('Error creating payment record:', error);
//         }
//       }
//     }

//     const instance = new Razorpay({ key_id: razorpayConf.key_id, key_secret: razorpayConf.key_secret });
//     const options = {
//       amount: req.body.amount * 100, // amount in the smallest currency unit
//       currency: 'INR',
//       receipt: req.body.receipt,
//       transfers: transferArray
//     };

//     console.log(options);

//     instance.orders.create(options, async (err, order) => {
//       if (err) {
//         console.error(err);
//         callback(500, 'Error In Order Creation', err);
//       } else {
//         try {
//           const payment = await Payment.create({
//             user: req.user,
//             orderId: order.id,
//             receipt: order.receipt,
//             status: 'Order ' + order.status
//           });

//           callback(200, 'Order Created', order);
//         } catch (e) {
//           console.error(e);
//           callback(500, 'Error In Order Creation', err);
//         }
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     callback(500, 'Error In Order Creation', error);
//   }
// };

const verifyPayment = async (req, callback) => {
  // Implement the payment verification logic using Sequelize
};

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
  // createRazorpayOrder
};
