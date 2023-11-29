const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    fabricId: Joi.string().optional(),
    designerName: Joi.string().optional(),
    productName: Joi.string().required(),
    // productNumber: Joi.number().required(),
    brandName: Joi.string().required(),
    basePrice: Joi.number().required(),
    discountPercentage: Joi.optional().allow(''),
    categoryId: Joi.number().required(),
    subCategoryId: Joi.number().required(),
    subSubCategoryId: Joi.number().required(),
    image: Joi.array().optional(),
    featuredImage: Joi.string().optional(),
    productType: Joi.number().valid(0, 1, 2, 3, 4).optional(), //0=newProduct, 1=hotDeals, 2=bestSeller, 3=isUpComing, 4= none
    length: Joi.number().required(),
    totalPrice: Joi.number().required(),
    currentStock: Joi.number().required(),
    description: Joi.string().required(),
    additionalInformation: Joi.string().optional().allow(""),
    sku: Joi.string().required(),
    tags: Joi.string().required(),
    fabric: Joi.string().optional(),
    size: Joi.array().required(),
    colour: Joi.array().required(),
    // quantity:Joi.number().required(),
    upComingDate: Joi.string().allow(''),
    status: Joi.boolean(),
    isActive: Joi.boolean()
  })
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
  fabricId: Joi.string().optional(),
  designerName: Joi.string().optional(),
  productName: Joi.string().optional(),
  // productNumber: Joi.number().required(),
  brandName: Joi.string().optional(),
  basePrice: Joi.number().optional(),
  discountPercentage: Joi.number().optional().allow(),
  categoryId: Joi.number().optional(),
  subCategoryId: Joi.number().optional(),
  subSubCategoryId: Joi.number().optional(),
  image: Joi.array().optional(),
  featuredImage: Joi.string().optional(),
  productType: Joi.number().valid(0, 1, 2, 3, 4).optional(), //0=newProduct, 1=hotDeals, 2=bestSeller, 3=isUpComing ,  4= none
  length: Joi.number().optional(),
  totalPrice: Joi.number().optional(),
  currentStock: Joi.number().optional(),
  description: Joi.string().optional(),
  additionalInformation: Joi.string().optional().allow(""),
  sku: Joi.string().optional(),
  tags: Joi.string().optional(),
  fabric: Joi.string().optional(),
  size: Joi.array().optional(),
  colour: Joi.array().optional(),
  // quantity:Joi.number().required(),
  upComingDate: Joi.string().allow(''),
  status: Joi.boolean(),
  isActive: Joi.boolean()
  })
};

module.exports = {
  createProduct,
  updateProduct
};
