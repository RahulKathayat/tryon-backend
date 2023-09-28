const Joi = require('joi')

const createSubscribedUser = {
  body: Joi.object().keys({
    email:Joi.string().required().email(),
    status: Joi.boolean()
  })
};
module.exports = {
  createSubscribedUser
};
