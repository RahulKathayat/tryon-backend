const { DiscountCoupon } = require('../models');

// const { cartService } = require('../services/cart.service');

const createCoupon = async (couponBody) => {
  const existingCoupon = await DiscountCoupon.findOne({
    where: { couponCode: couponBody.couponCode, status: true }
  });
  if (!existingCoupon) {
    return DiscountCoupon.create(couponBody);
  }
  return false;
};

const ifExistCoupon = async (id) => {
  if (id) {
    const support = await DiscountCoupon.findOne({ where: { id: id } });
    return support;
  }
  const support = await DiscountCoupon.findAndCountAll();
  return support;
};
const verifyCoupon = async (couponcode) => {
  const support = await DiscountCoupon.findOne({ where: { couponCode: couponcode, status: true } });
  if (support) {
    return support;
  }
  return false;
};
const getCoupon = async (id) => {
  const coupon = await DiscountCoupon.findAndCountAll({
    order: [['updatedAt', 'DESC']]
  });
  return coupon;
};

const getCouponById = async (id) => {
  try {
    console.log('id 0000000000000000000000000000000000000', id);
    const data = await DiscountCoupon.findOne({
      where: { id: id, status: true }
    });
    console.log('ch handle data==================', data);
    if (!data) {
      return false;
    }
    return data;
  } catch (error) {
    console.error('DiscountCoupon found!!', error);
  }
};

const updateCouponById = async (id, newData) => {
  try {
    const updateQuantity = await DiscountCoupon.update(newData, { where: { id: id } });
    return updateQuantity;
  } catch (err) {
    console.log('err=====================', err);
  }
};

const deleteCouponById = async (id) => {
  try {
    const data = await DiscountCoupon.findOne({ where: { id: id } });

    if (!data) {
      throw new Error('Coupon not found');
    }
    data.status = 0;
    await data.save();

    console.log('Coupon deleted successfully');

    return { message: 'Coupon deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createCoupon,
  getCoupon,
  updateCouponById,
  deleteCouponById,
  getCouponById,
  ifExistCoupon,
  verifyCoupon
};
