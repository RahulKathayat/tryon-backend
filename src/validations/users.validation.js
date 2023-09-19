const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().required().email(),
    emailVerify: Joi.boolean().required(),
    password: Joi.string().required(),
    addressId: Joi.number().required(),
    dob: Joi.date().required(),
    role: Joi.string().required().valid('Admin', 'Customer'),
    status: Joi.boolean()
  })
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    email: Joi.string().required().email(),
    emailVerify: Joi.boolean().required(),
    password: Joi.string().required(),
    addressId: Joi.number().required(),
    dob: Joi.date().required(),
    role: Joi.string().required(),
    status: Joi.boolean()
  })
};

module.exports = {
  createUser,
  updateUser
};
