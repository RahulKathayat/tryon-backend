const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createOrderDetails = {
  body: Joi.object().keys({
    orderId:Joi.number().required(),
    type:Joi.string().required(),
    amount:Joi.number().required(),
    status: Joi.boolean()
  })
};

const updateOrderDetails = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  orderId:Joi.number().required(),
  type:Joi.string().required(),
  amount:Joi.number().required(),
  status: Joi.boolean()
};

module.exports = {
    createOrderDetails,
    updateOrderDetails
};
