const catchAsync = require('../utils/catchAsync');
const refundService = require('../services/refund.service');
const httpStatus = require('http-status');

const   createRefund= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await refundService.createRefund(userBody);
  if (data) {
    await res.status(200).send({ message: 'refund created successfully' });
  } else {
    await res.status(404).send({ message: 'refund not created' });
  }
});



const getRefund = catchAsync(async (req, res) => {
  const data = await refundService.getRefund();
  if (data) {
    res.status(httpStatus.OK).send({ message: 'refund data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getRefundById = catchAsync(async (req, res) => {
  const data = await refundService.getRefundById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'refund data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateRefund = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await refundService.updateRefundById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'refund updated successfully' });
    } else {
      res.status(404).send({ message: 'refund not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteRefund = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await refundService.deleteRefundById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'refund deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});
module.exports = {
  createRefund,
  deleteRefund,
  getRefund,
  updateRefund,
  getRefundById
};
