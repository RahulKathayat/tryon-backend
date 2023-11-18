const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    categoryName: Joi.string().required(),
    popularCategory: Joi.boolean().required(),
    // image:Joi.string().optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean(),
    isFeatured: Joi.boolean(),
    isFrequent: Joi.boolean()
  })
};

const updateCategory = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    categoryName: Joi.string().optional(),
    popularCategory: Joi.boolean().optional(),
    // image:Joi.string().optional(),
    status: Joi.boolean(),
    isActive: Joi.boolean(),
    isFeatured: Joi.boolean(),
    isFrequent: Joi.boolean()
  })
};

module.exports = { createCategory, updateCategory };
