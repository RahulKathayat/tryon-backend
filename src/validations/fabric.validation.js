const Joi = require('joi');

const createFabric = {
  body: Joi.object().keys({
    fabricType: Joi.string().required(),
    fabricName: Joi.string().required(),
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
    quantity:Joi.number().required(),
    image:Joi.string().optional(),
    status: Joi.boolean()
  })
};

const updateFabric = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    fabricName: Joi.string().required(),
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
    quantity:Joi.number().required(),
    image:Joi.string().optional(),
    status: Joi.boolean()
  })
};

module.exports = { createFabric, updateFabric };
