const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    fabricId: Joi.string().optional(),
    designerName: Joi.string().optional(),
    productName: Joi.string().required(),
    productNumber: Joi.number().required(),
    brandName: Joi.string().required(),
    basePrice: Joi.number().required(),
    discountPercentage: Joi.number().optional(),
    categoryId: Joi.number().required(),
    subCategoryId: Joi.number().required(),
    subSubCategoryId: Joi.number().required(),
    image: Joi.array().optional(),
    featuredImage: Joi.string().optional(),
    productType: Joi.number().valid(0, 1, 2, 3).required(), //0=newProduct, 1=hotDeals, 2=bestSeller, 3=isUpComing
    length: Joi.number().required(),
    totalPrice: Joi.number().required(),
    currentStock: Joi.number().required(),
    description: Joi.string().required(),
    additionalInformation: Joi.string().required(),
    sku: Joi.string().required(),
    tags: Joi.string().required(),
    fabric: Joi.string().required(),
    size: Joi.array().required(),
    colour: Joi.array().required(),
    status: Joi.boolean()
  })
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  fabricId: Joi.string().optional(),
  designerName: Joi.string().optional(),
  productName: Joi.string().required(),
  productNumber: Joi.number().required(),
  brandName: Joi.string().required(),
  basePrice: Joi.number().required(),
  discountPercentage: Joi.number().optional(),
  categoryId: Joi.number().required(),
  subCategoryId: Joi.number().required(),
  subSubCategoryId: Joi.number().required(),
  image: Joi.array().optional(),
  featuredImage: Joi.string().optional(),
  productType: Joi.number().valid(0, 1, 2, 3).required(), //0=newProduct, 1=hotDeals, 2=bestSeller, 3=isUpComing
  length: Joi.number().required(),
  totalPrice: Joi.number().required(),
  currentStock: Joi.number().required(),
  description: Joi.string().required(),
  additionalInformation: Joi.string().required(),
  sku: Joi.string().required(),
  tags: Joi.string().required(),
  fabric: Joi.string().required(),
  size: Joi.array().required(),
  colour: Joi.array().required(),
  status: Joi.boolean()
};

module.exports = {
  createProduct,
  updateProduct
};
