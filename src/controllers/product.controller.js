const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Op } = require('sequelize');

const createProduct = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await productService.createProduct(userBody);
  if (data) {
    await res.status(200).send({ message: 'card created successfully' });
  } else {
    await res.status(404).send({ message: 'card not created' });
  }
});

const getProduct = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const { productName, productNumber, brandName, originalPrice, discountedPrice, productType } = req.query;
  productName ? (query.productName = { [Op.like]: `%${productName}%` }) : null;
  productNumber ? (query.productNumber = { [Op.like]: `%${productNumber}%` }) : null;
  brandName ? (query.brandName = { [Op.like]: `%${brandName}%` }) : null;
  originalPrice ? (query.originalPrice = { [Op.like]: `%${originalPrice}%` }) : null;
  discountedPrice ? (query.discountedPrice = { [Op.like]: `%${discountedPrice}%` }) : null;
  productType ? (query.productType = { [Op.like]: `%${productType}%` }) : null;

  const data = await productService.getProduct(query, options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'product data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getProductById = catchAsync(async (req, res) => {
  const data = await productService.getProductById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'product data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});
const updateProduct = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await productService.updateProductById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'product updated successfully' });
    } else {
      res.status(404).send({ message: 'card not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await productService.deleteProductById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'product deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});



module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  getProductById
};
