const Joi = require('joi');

const createProductFabric = {
  body: Joi.object().keys({
   fabricId:Joi.number().required(),
   productId:Joi.number().required(),
   defaultFabric: Joi.string().optional(),
   status: Joi.boolean()
  })
};

const updateProductFabric = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    fabricId:Joi.number().required(),
    productId:Joi.number().required(),
    defaultFabric: Joi.string().optional(),
    status: Joi.boolean()
})
}
module.exports = {
    createProductFabric,
    updateProductFabric
};
