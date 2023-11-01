const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createPayment = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    orderDetailId: Joi.number().required(),
    status: Joi.boolean()
  })
};

const updatePayment = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  userId: Joi.number().required(),
  orderDetailId: Joi.number().required(),
  status: Joi.boolean()
};

module.exports = {
  createPayment,
  updatePayment
};
