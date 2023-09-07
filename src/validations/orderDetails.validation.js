const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createOrderDetails = {
  body: Joi.object().keys({
    type:Joi.string().required(),
    amount:Joi.number().required(),
    trackingId:Joi.string().required(),
    trackingLink:Joi.string().required(),
    status: Joi.boolean()
  })
};

const updateOrderDetails = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  type:Joi.string().required(),
  amount:Joi.number().required(),
  trackingId:Joi.string().required(),
  trackingLink:Joi.string().required(),
  status: Joi.boolean()
};

module.exports = {
    createOrderDetails,
    updateOrderDetails
};
