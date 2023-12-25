const Joi = require('joi');
const updateCoupon = {
  params: Joi.object().keys({
    id: Joi.number().optional()
  }),
  body: Joi.object().keys({
    couponCode: Joi.string().optional(),
    description: Joi.string().optional(),
    discount: Joi.number().optional(),
    status: Joi.boolean()
  })
};

const VerifyCoupon = {
  query: Joi.object().keys({
    couponcode: Joi.string().optional()
  })
};
const getCouponById = {
  params: Joi.object().keys({
    id: Joi.string().optional()
  })
};

module.exports = { updateCoupon, VerifyCoupon, getCouponById };
