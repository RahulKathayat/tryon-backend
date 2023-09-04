const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createAddProduct = {
  body: Joi.object().keys({
    productId:Joi.number().required(),
    productDetailId:Joi.number().required(),
    userId:Joi.number().required(),
    type:Joi.string().valid('Whislist','Cart').required(),
    status: Joi.boolean()
  })
};

const updateAddProduct = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  productId:Joi.number().required(),
  productDetailId:Joi.number().required(),
  userId:Joi.number().required(),
  type:Joi.string().valid('Whislist','Cart').required(),
  status: Joi.boolean()
};

module.exports = {
    createAddProduct,
    updateAddProduct
};
