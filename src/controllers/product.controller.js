const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const wishlistService = require('../services/wishList.service');
const ratingsService = require('../services/ratings.services');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { Op, Sequelize } = require('sequelize');
const express = require('express');
const app = express();
const { encode } = require('hi-base32');
const product = require('../models/product');
const cron = require('node-cron');

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

const getProduct = async (req, res) => {
  let query = {};
  req.query ? (query.status = req.query.status ? req.query.status : true) : '';
  query.isActive = req.query.isActive ? req.query.isActive : true;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const between = pick(req.query, ['priceFrom', 'priceTo']);
  const order = req.query.order; // 'asc' or 'desc' for ordering
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
    'id',
    'colour'
  ];
  filterParameters.forEach((param) => {
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
  const data = await productService.getProduct(query, options, between, order);
  // if (data) {
  //   const getAvrageRatings = await ratingsService.calculateAverageRatings();
  //   if (getAvrageRatings) {
  //     const updateAvrageRatings = await productService.updateAvrageRatings(getAvrageRatings);
  //   }
  // }

  if (data) {
    res.status(httpStatus.OK).send({ message: 'Product data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
};

const getProductForAdmin = async (req, res) => {
  let query = {};
  const userId = req.user.id;
  req.query ? (query.status = req.query.status ? req.query.status : true) : '';

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const between = pick(req.query, ['priceFrom', 'priceTo']);
  const order = req.query.order; // 'asc' or 'desc' for ordering
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
    'id',
    'colour'
  ];
  filterParameters.forEach((param) => {
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
  const data = await productService.getProductForAdmin(query, options, between, order, userId);
  // if (data) {
  //   const getAvrageRatings = await ratingsService.calculateAverageRatings();
  //   if (getAvrageRatings) {
  //     const updateAvrageRatings = await productService.updateAvrageRatings(getAvrageRatings);
  //   }
  // }

  if (data) {
    res.status(httpStatus.OK).send({ message: 'Product data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
};

const getProductBySearch = catchAsync(async (req, res) => {
  let query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const between = pick(req.query, ['priceFrom', 'priceTo']);
  const search = req.query.search;
  if (search) {
    query = {
      ...query,
      [Op.or]: [
        {
          productName: {
            [Op.like]: `%${search}%`
          }
        },
        {
          brandName: {
            [Op.like]: `%${search}%`
          }
        },
        {
          productType: {
            [Op.like]: `%${search}%`
          }
        },
        {
          designerName: {
            [Op.like]: `%${search}%`
          }
        },
        {
          fabric: {
            [Op.like]: `%${search}%`
          }
        },
        {
          size: {
            [Op.like]: `%${search}%`
          }
        },
        {
          colour: {
            [Op.like]: `%${search}%`
          }
        },
        {
          description: {
            [Op.like]: `%${search}%`
          }
        },
        {
          additionalInformation: {
            [Op.like]: `%${search}%`
          }
        }
      ]
    };
  }
  const data = await productService.getProductBySearch(query, options, between);

  if (data) {
    res.status(httpStatus.OK).send({ message: 'Product data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
});

const getHighToLowPrice = catchAsync(async (req, res) => {
  const data = await productService.getHighToLowPrice(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'product data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});
const getLowToHighPrice = catchAsync(async (req, res) => {
  const data = await productService.getLowToHighPrice(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'product data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const isUpcomingproduct = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await productService.isUpcomingProduct(options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Product data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
});

const getProductById = catchAsync(async (req, res) => {
  const data = await productService.getProductById(req.params.id, req.query.limit);
  if (data === false) {
    res.status(httpStatus.BAD_REQUEST).send({ message: "i'd does not exist " });
  }
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
    const userId = req.user.id;
    const body = {};
    if (req.body.image) {
      body.image = req.body.image;
    }
    const updatedUser = await productService.updateImage(userId, body.image);
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

// For logged-in users
const getProductsForUser = async (req, res, next) => {
  const userId = req.user.id;
  try {
    let query = {};
    query.status = req.query.status ? req.query.status : true;
    query.isActive = req.query.isActive ? req.query.isActive : true;

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const between = pick(req.query, ['priceFrom', 'priceTo']);
    const order = req.query.order; // 'asc' or 'desc' for ordering
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
      'id',
      'colour'
    ];

    filterParameters.forEach((param) => {
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

    let products = await productService.getProductForWishlist(query, options, between, order);
    const wishlistedProductIds = await wishlistService.isWishlisted(userId);
    // products = products.map((product) => product.get({ plain: true }));
    products = products.map((product) => {
      let whishlisted = false;
      if (wishlistedProductIds.includes(product.id)) {
        whishlisted = true;
      }
      return {
        ...product.get({ plain: true }), // Get the product as a plain object
        isWishlisted: whishlisted // Add your custom key and value
      };
    });

    res.status(httpStatus.OK).send({
      message: 'Products fetched successfully',
      data: products
    });
  } catch (error) {
    next(error);
  }
};

cron.schedule('* * * * * *', async () => {
  // const getAvrageRatings = await ratingsService.calculateAverageRatings();
  // if (getAvrageRatings) {
  //   await productService.updateAvrageRatings(getAvrageRatings);
  // }
  // console.log('cron Called');
});

const updateIsActive = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await productService.updateIsActive(userId, newData);
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

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  getProductById,
  uploadFeatureImage,
  uploadImages,
  updateImage,
  getProductById,
  getLowToHighPrice,
  getHighToLowPrice,
  isUpcomingproduct,
  getProductBySearch,
  getProductsForUser,
  getProductForAdmin,
  updateIsActive
};
