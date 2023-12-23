const Joi = require('joi');
const updateCms = {
  body: Joi.object().keys({
    DISCOUNT_BANNER: Joi.string().optional(),

    CMS: Joi.object().optional(),
    NAME: Joi.string().optional(),
    CONTENT: Joi.string().optional().allow(''),

    status: Joi.boolean()
  })
};

module.exports = { updateCms };
