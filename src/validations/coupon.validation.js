const Joi = require('joi');
const updateCoupon = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    couponCode: Joi.string().optional(),
    description: Joi.string().optional(),
    discount: Joi.number().optional(),
    status: Joi.boolean()
  })
};

module.exports = { updateCoupon };
