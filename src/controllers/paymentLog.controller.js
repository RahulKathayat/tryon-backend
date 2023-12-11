const catchAsync = require('../utils/catchAsync');
const { paymentLogService, orderService } = require('../services');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const createPaymentLog = catchAsync(async (req, res) => {
  try {
    let userId = req.user.id;
    let body = req.body;
    const data = await paymentLogService.createPaymentLog(body, userId);

    if (data) {
      if (data.dataValues.paymentResponse.status === 'failed') {
        await orderService.orderStatusToPaymentFaild(data.dataValues.orderId);
      }
      await res.status(200).send({ message: 'payment log created successfully' });
    } else {
      await res.status(404).send({ message: 'payment log not created' });
    }
  } catch (err) {
    console.log('error==========', err);
  }
});

const getPaymentLog = catchAsync(async (req, res) => {
  try {
    let userId = req.user.id;

    const data = await paymentLogService.getPaymentLog(userId);

    if (data) {
      res.status(200).send({ message: 'Payment log fetched successfully', data });
    } else {
      res.status(404).send({ message: 'Not Found!' });
    }
  } catch (error) {
    console.error('Error fetching payment log:', error);
    res.status(500).send({ error: error.message });
  }
});

const getPaymentLogForAdmin = catchAsync(async (req, res) => {
  try {
    let userId = req.user.id;
    const data = await paymentLogService.getPaymentLogForAdmin(userId);

    if (data) {
      res.status(200).send({ message: 'Payment log fetched successfully', data });
    } else {
      res.status(404).send({ message: 'Not Found!' });
    }
  } catch (error) {
    console.error('Error fetching payment log:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  createPaymentLog,
  getPaymentLog,
  getPaymentLogForAdmin
};
