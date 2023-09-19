const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    productName: Joi.string().required(),
    productNumber: Joi.number().required(),
    brandName: Joi.string().required(),
    originalPrice: Joi.number().required(),
    discountedPrice: Joi.number().required(),
    categoryId: Joi.number().required(),
    subCategoryId: Joi.number().required(),
    subSubCategoryId: Joi.number().required(),
    image: Joi.array().optional(),
    featuredImage:Joi.string().optional(),
    productType: Joi.number().valid(0, 1, 2).required(), //0=newProduct, 1=hotDeals, 2=bestSeller
    length: Joi.number().required(),
    status: Joi.boolean()
  })
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  productName: Joi.string().required(),
  productNumber: Joi.number().required(),
  brandName: Joi.string().required(),
  originalPrice: Joi.number().required(),
  discountedPrice: Joi.number().required(),
  categoryId: Joi.number().required(),
  subCategoryId: Joi.number().required(),
  subSubCategoryId: Joi.number().required(),
  image: Joi.array().optional(),
  featuredImage: Joi.array().optional(),
  productType: Joi.number().valid(0, 1, 2).required(), //0=newProduct, 1=hotDeals, 2=bestSeller
  length: Joi.number().required(),
  status: Joi.boolean()
};

module.exports = {
  createProduct,
  updateProduct
};
