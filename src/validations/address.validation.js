const Joi = require('joi');

const createAddress = {
  body: Joi.object().keys({
    address: Joi.object().required(),
    defaultAddress: Joi.boolean(),
    status: Joi.boolean()
  })
};

const updateAddress = {
  // params: Joi.object().keys({
  //     id: Joi.number().required()
  //   }),
  body: Joi.object().keys({
    address: Joi.object().optional(),
    defaultAddress: Joi.boolean(),
    status: Joi.boolean()
  })
};

module.exports = { createAddress, updateAddress };
