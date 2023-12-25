const catchAsync = require('../utils/catchAsync');
const couponService = require('../services/coupon.service');
const httpStatus = require('http-status');

const getCouponById = catchAsync(async (req, res) => {
  const data = await couponService.getCouponById(req.query.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Coupon data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});
const verifyCoupon = catchAsync(async (req, res) => {
  const couponcode = req.query.couponcode;

  const data = await couponService.verifyCoupon(couponcode);

  if (data === false) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'invalid coupon code' });
  } else {
    res.status(httpStatus.OK).send({ message: 'Coupon Code Verify Successfully', data: data });
  }
  return data;
});
const getCoupon = catchAsync(async (req, res) => {
  const id = req.query.id;
  const data = await couponService.getCoupon(id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Coupon data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});
const ifExistCoupon = catchAsync(async (req, res) => {
  const couponcode = req.query.couponcode;
  const data = await couponService.getCoupon(couponcode);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Coupon data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});
const updateCoupon = catchAsync(async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const updatedUser = await couponService.updateCouponById(id, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'Coupon updated successfully' });
    } else {
      res.status(404).send({ message: 'Coupon not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteCoupon = catchAsync(async (req, res) => {
  const deleteUser = await couponService.deleteCouponById(req.query.id);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'Coupon deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in Coupon delete' });
  }
});

async function createCoupon(req, res) {
  try {
    const Coupon = await couponService.createCoupon(req.body);
    if (Coupon == false) {
      res.status(400).send({ message: 'coupon already exist' });
      return Coupon;
    }
    if (Coupon) {
      res.status(200).send({ message: 'coupon created successfully' });
      return Coupon;
    } else {
      res.status(400).send({ message: 'coupon not created ' });
      return Coupon;
    }
  } catch (error) {
    console.log('ero------------------', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteCoupon,
  getCoupon,
  updateCoupon,
  createCoupon,
  getCouponById,
  ifExistCoupon,
  verifyCoupon
};
