const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createRatings = {
  body: Joi.object().keys({
    //  userId:Joi.number().required(),
    orderId: Joi.number().required(),
    productId: Joi.number().required(),
    review: Joi.string().optional(),
    ratings: Joi.number().optional(),
    status: Joi.boolean()
  })
};

const updateRatings = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  // userId: Joi.number().required(),
  orderId: Joi.number().required(),
  productId: Joi.number().required(),
  review: Joi.string().optional(),
  ratings: Joi.number().optional(),
  status: Joi.boolean()
};

module.exports = {
  createRatings,
  updateRatings
};
