const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    totalItems: Joi.number().required(),
    totalQuantity: Joi.number().required(),
    status: Joi.boolean()
  })
};

const updateOrder = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  userId: Joi.number().required(),
  totalItems: Joi.number().required(),
  totalQuantity: Joi.number().required(),
  status: Joi.boolean()
};

module.exports = {
  createOrder,
  updateOrder
};
