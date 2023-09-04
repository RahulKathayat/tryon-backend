const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    
    productName:Joi.string().required(),
    productNumber:Joi.number().required(),
    brandName:Joi.string().required(),
    originalPrice:Joi.number().required(),
    discountedPrice:Joi.number().required(),
    categoryId:Joi.number().required(),
    subCategoryId:Joi.number().required(),
    subSubCategoryId:Joi.number().required(),
    image:Joi.string().required(),
    featuredImage:Joi.string().required(),
    trendingProduct:Joi.boolean(),
    status: Joi.boolean()
  })
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  productName:Joi.string().required(),
    productNumber:Joi.number().required(),
    brandName:Joi.string().required(),
    originalPrice:Joi.number().required(),
    discountedPrice:Joi.number().required(),
    categoryId:Joi.number().required(),
    subCategoryId:Joi.number().required(),
    subSubCategoryId:Joi.number().required(),
    image:Joi.string().required(),
    featuredImage:Joi.string().required(),
    trendingProduct:Joi.boolean(),
    status: Joi.boolean()
};

module.exports = {
    createProduct,
    updateProduct
};
