const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createRefund = {
  body: Joi.object().keys({
    userId: Joi.number().optional(),
    orderId: Joi.number().optional(),
    orderDetailId: Joi.number().optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateRefund = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
  userId: Joi.number().required(),
  orderId: Joi.number().required(),
  orderDetailId: Joi.number().required(),
  status: Joi.boolean(),
  isActive: Joi.boolean()
  })
};

module.exports = {
  createRefund,
  updateRefund
};
