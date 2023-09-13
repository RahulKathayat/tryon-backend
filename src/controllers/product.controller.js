const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
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

const uploadFeatureImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'You must select a file.' });
    }
    const originalFilePath = req.file.path.trim();

    return res.status(200).send({ message: 'File has been uploaded ', pic: originalFilePath });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: `Error when trying to upload and process images: ${error.message}` });
  }
};

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

const uploadImages = async (req, res) => {
  try {
    const images = req.files;
    console.log('===============================', req.file);
    console.log('images==============', images);

    if (!images || images.length === 0) {
      return res.status(400).send('You must select at least one file.');
    }

    const fileInformation = images.map((file) => ({
      filename: file.filename.trim(),
      mimetype: file.mimetype.trim(),
      size: file.size
    }));

    res.send({ message: 'Images uploaded successfully', fileInformation });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error when trying to upload images: ${error}`);
  }
};

//updateImage
const updateImage = catchAsync(async (req, res) => {
  try {
    console.log('id Req================', req.user);
    const userId = req.user.id;
    const body = {};
    if (req.body.image) {
      body.image = req.body.image;
    }
    console.log('body data======================', body.image);
    const updatedUser = await productService.updateImage(userId, body.image);
    console.log('updateUser================', updatedUser);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'image successfully' });
    } else {
      res.status(404).send({ message: 'User not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  getProductById,
  uploadFeatureImage,
  uploadImages,
  updateImage,
  getProductById
};
