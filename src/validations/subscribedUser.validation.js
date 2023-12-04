const Joi = require('joi')

const createSubscribedUser = {
  body: Joi.object().keys({
    email:Joi.string().required().email(),
    status: Joi.boolean(),
  isActive:Joi.boolean()

  })
};

const updateSubscribedUser = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    status: Joi.boolean(),
    isActive:Joi.boolean()
  })
};
module.exports = {
  createSubscribedUser,
  updateSubscribedUser
};
