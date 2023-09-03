const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createProductDetail = {
  body: Joi.object().keys({
   productId:Joi.number().required(),
   description: Joi.string().required(),
   size:Joi.number().required(),
   colour:Joi.string().required(),
   status: Joi.boolean()
  })
};

const updateProductDetail = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  productId:Joi.number().required(),
  description: Joi.string().required(),
  size:Joi.number().required(),
  colour:Joi.string().required(),
  status: Joi.boolean()
};

module.exports = {
    createProductDetail,
    updateProductDetail
};
