const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const createProduct = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await productService.createProduct(userBody);
  if (data) {
    await res.status(200).send({ message: 'Product created successfully' });
  } else {
    await res.status(404).send({ message: 'Product not created' });
  }
});

const uploadFeatureImage = async (req, res) => {
  try {
    console.log('======================', req.file);
    if (!req.file) {
      return res.status(400).send({ message: 'You must select a file.' });
    }
    const originalFilePath = req.file.filename.trim();

    return res.status(200).send({ message: 'File has been uploaded ', pic: originalFilePath });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: `Error when trying to upload and process images: ${error.message}` });
  }
};

const getProduct = catchAsync(async (req, res) => {
  let query = {};
  query.status = req.query.status ? req.query.status : true;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const between = pick(req.query, ['priceFrom', 'priceTo']);
  const filterParameters = [
    'productName',
    'productNumber',
    'brandName',
    'discountPercentage',
    'productType',
    'designerName',
    'basePrice',
    'totalPrice',
    'currentStock',
    'fabricId',
    'categoryId',
    'subCategoryId',
    'subSubCategoryId',
    'sku',
    'tags',
    'fabric',
    'size',
    'colour'
  ];

  filterParameters.forEach((param) => {
    console.log('param================================', req.query[param]);
    if (param !== 'priceFrom' && param !== 'priceTo' && req.query[param]) {
      if (req.query[param].includes(',')) {
        const values = req.query[param].split(',');
        query[param] = {
          [Op.or]: values.map((value) => ({
            [Op.like]: `%${value.trim()}%`
          }))
        };
      } else {
        query[param] = {
          [Op.like]: `%${req.query[param]}%`
        };
      }
    }
  });
  const data = await productService.getProduct(query, options, between);

  if (data) {
    res.status(httpStatus.OK).send({ message: 'Product data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
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
    console.log('user id================', userId);
    const newData = req.body;
    const updatedUser = await productService.updateProductById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'product updated successfully' });
    } else {
      res.status(404).send({ message: 'Product not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating Product:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await productService.deleteProductById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'product deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in Product delete' });
  }
});

const uploadImages = async (req, res) => {
  try {
    const images = req.files;
    console.log('images==============', images);

    if (!images || images.length === 0) {
      return res.status(400).send('You must select at least one file.');
    }

    const fileInformation = images.map((file) => {
      console.log(file.file);
      return file.filename.trim();
    });
    // const fileInformation= image.map((item)=>{
    // return item.filename
    // })
    // console.log("file===========",image);

    res.send({ message: 'Images uploaded successfully', fileInformation: fileInformation });
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
