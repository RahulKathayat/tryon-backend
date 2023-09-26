const Joi = require('joi');

const getSubCategory = {
  query: Joi.object().keys({
    categoryId: Joi.number()
  })
};
const createSubCategory = {
  body: Joi.object().keys({
    categoryId: Joi.number().required(),
    subCategoryName: Joi.string().required(),
    image: Joi.string().optional(),
    status: Joi.boolean()
  })
};

const updateSubCategory = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    // categoryId:Joi.number().required(),
    subCategoryName: Joi.string().required(),
    image: Joi.string().optional(),
    status: Joi.boolean()
  })
};

module.exports = { createSubCategory, updateSubCategory, getSubCategory };
