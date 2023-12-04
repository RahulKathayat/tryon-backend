const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createOrderDetails = {
  body: Joi.object().keys({
    orderId: Joi.number().required(),
    productId: Joi.number().required(),
    type: Joi.string().valid('Delivered', 'Return', 'Cancel','Refund', 'On Process').required(),
    amount: Joi.number().required(),
    trackingId: Joi.string().required(),
    trackingLink: Joi.string().required(),
    totalQuantity: Joi.number().required(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateOrderDetails = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
  orderId: Joi.number().optional(),
  productId: Joi.number().optional(),
  type: Joi.string().valid('Delivered', 'Return', 'Cancel','Refund', 'On Process').optional(),
  amount: Joi.number().optional(),
  trackingId: Joi.string().optional(),
  trackingLink: Joi.string().optional(),
  totalQuantity: Joi.number().optional(),
  status: Joi.boolean(),
  isActive: Joi.boolean()

})
};

const manageOrder = {
  params: Joi.object().keys({
    orderDetailId: Joi.number().required()
  }),
  body: Joi.object().keys({
  type: Joi.string().valid('Delivered', 'Return', 'Cancel','Refund', 'On Process').required(),
  })
};

module.exports = {
  createOrderDetails,
  updateOrderDetails,
  manageOrder
};
