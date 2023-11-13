const Joi = require('joi');

const createCart = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    cartDetail: Joi.object().required(),
    totalAmount: Joi.number().required(),
    totalItems: Joi.number().required(),
    totalQuantity: Joi.number().required(),
    discountCode: Joi.string().required(),
    role: Joi.string().valid('Customer').required(),
    status: Joi.boolean()
  })
};

const updateCart = {
  body: Joi.object().keys({
    // userId:Joi.number().required(),
    cartDetail: Joi.object().optional(),
    totalAmount: Joi.number().optional(),
    totalItems: Joi.number().optional(),
    totalQuantity: Joi.number().optional(),
    discountCode: Joi.string().optional(),
    quantity: Joi.number().optional(),
    addressId: Joi.number().optional(),
    status: Joi.boolean()
  })
};

const clearCart = {};

module.exports = { createCart, updateCart, clearCart };
