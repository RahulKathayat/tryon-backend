const Joi = require('joi');

const createProductFabric = {
  body: Joi.object().keys({
    fabricId: Joi.number(),
    productId: Joi.number(),
    defaultFabric: Joi.boolean().optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateProductFabric = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    fabricId: Joi.number().optional(),
    productId: Joi.number().optional(),
    defaultFabric: Joi.boolean().optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};
module.exports = {
  createProductFabric,
  updateProductFabric
};
