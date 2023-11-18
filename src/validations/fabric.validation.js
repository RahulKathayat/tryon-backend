const Joi = require('joi');

const createFabric = {
  body: Joi.object().keys({
    fabricType: Joi.string().required(),
    weight: Joi.string().required(),
    printType: Joi.string().required(),
    usage: Joi.string().required(),
    properties: Joi.string().required(),
    handle: Joi.string().required(),
    construction: Joi.string().required(),
    transparency: Joi.string().required(),
    reflection: Joi.string().required(),
    price: Joi.number().required(),
    maxWidth: Joi.number().required(),
    gsm: Joi.number().required(),
    quantity: Joi.number().required(),
    image: Joi.string().optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateFabric = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    fabricType: Joi.string().optional(),
    weight: Joi.string().optional(),
    printType: Joi.string().optional(),
    usage: Joi.string().optional(),
    properties: Joi.string().optional(),
    handle: Joi.string().optional(),
    construction: Joi.string().optional(),
    transparency: Joi.string().optional(),
    reflection: Joi.string().optional(),
    price: Joi.number().optional(),
    maxWidth: Joi.number().optional(),
    gsm: Joi.number().optional(),
    quantity: Joi.number().optional(),
    image: Joi.string().optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

module.exports = { createFabric, updateFabric };
