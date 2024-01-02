const Joi = require('joi');

const createContact = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string(),
    status: Joi.boolean()
  })
};

module.exports = { createContact };
