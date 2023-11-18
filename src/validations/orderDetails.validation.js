const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createOrderDetails = {
  body: Joi.object().keys({
    orderId: Joi.number().required(),
    productId: Joi.number().required(),
    type: Joi.string().valid('Delivered', 'Return', 'Cancel', 'Refund').required(),
    amount: Joi.number().required(),
    trackingId: Joi.string().required(),
    trackingLink: Joi.string().required(),
    totalQuantity: Joi.number().required(),
    status: Joi.boolean(),
    isActive:Joi.boolean()
  })
};

const updateOrderDetails = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  orderId: Joi.number().required(),
  productId: Joi.number().required(),
  type: Joi.string().valid('Delivered', 'Return', 'Cancel').required(),
  amount: Joi.number().required(),
  trackingId: Joi.string().required(),
  trackingLink: Joi.string().required(),
  totalQuantity: Joi.number().required(),
  status: Joi.boolean(),
  isActive:Joi.boolean()
};

module.exports = {
  createOrderDetails,
  updateOrderDetails
};
