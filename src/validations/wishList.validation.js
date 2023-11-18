const Joi = require('joi');

const createWishlist = {
  body: Joi.object().keys({
    productId: Joi.number().required(),
    // userId: Joi.number().required(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateWishlist = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  productId: Joi.number().optional(),
  // userId: Joi.number().required(),
  status: Joi.boolean(),
  isActive: Joi.boolean()
};

module.exports = {
  createWishlist,
  updateWishlist
};
