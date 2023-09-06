const Joi = require('joi')

const createWishlist = {
  body: Joi.object().keys({
    productId:Joi.number().required(),
    productDetailId:Joi.number().required(),
    userId:Joi.number().required(),
    status: Joi.boolean()
  })
};

const updateWishlist = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  productId:Joi.number().required(),
  productDetailId:Joi.number().required(),
  userId:Joi.number().required(),
  status: Joi.boolean()
};

module.exports = {
    createWishlist,
    updateWishlist
};
