const Joi = require('joi');

const createPaymentLog = {
  body: Joi.object().keys({
    orderId: Joi.number().required(),
    paymentResponse: Joi.object().required(),
    status: Joi.boolean()
  })
};



module.exports = { createPaymentLog };
