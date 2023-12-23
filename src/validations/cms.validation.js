const Joi = require('joi');
const updateCms = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    DISCOUNT_BANNER: Joi.string().optional(),

    CMS: Joi.object().optional(),
    NAME: Joi.string().optional(),
    CONTENT: Joi.string().optional().allow(''),

    status: Joi.boolean()
  })
};

module.exports = { updateCms };
