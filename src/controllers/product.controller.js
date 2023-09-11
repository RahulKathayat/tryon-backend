const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const createProduct = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await productService.createProduct(userBody);
  if (data) {
    await res.status(200).send({ message: 'card created successfully' });
  } else {
    await res.status(404).send({ message: 'card not created' });
  }
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'You must select a file.' });
    }
    const originalFilePath = req.file.path;
    console.log('originalFilePath==================== ', originalFilePath);
    if (!fs.existsSync(originalFilePath)) {
      return res.status(400).send({ message: 'Input file does not exist.' });
    }

    const originalFilename = req.file.filename;
    const baseFileName = path.parse(originalFilename).name;
    console.log('file name===============', originalFilename);

    const resized100 = `${baseFileName}_100x100.png`;
    await sharp(originalFilePath)
      .resize(100, 100)
      .png({ quality: 90 })
      .toFile(path.resolve(__dirname + '/uploads', resized100));
    console.log('dirName========================================', __dirname);

    const resized300 = `${originalFilename}_300x300.png`;
    await sharp(originalFilePath)
      .resize(200, 200)
      .png({ quality: 90 })
      .toFile(path.resolve(__dirname + '/uploads', resized300));

    const resized800 = `${originalFilename}`;
    await sharp(originalFilePath)
      .resize(800, 800)
      .png({ quality: 90 })
      .toFile(path.resolve(__dirname + '/uploads', resized800));

    fs.unlinkSync(originalFilePath);

    return res.status(200).send({ message: 'File has been uploaded and processed.', pic: originalFilename });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: `Error when trying to upload and process images: ${error.message}` });
  }
};

const getProduct = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
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

// // upload image
// const uploadImage = async (req, res) => {
//   try {
//     console.log("request===datavalue===========================================",req.user)
//     const image = req.file.filename;
//     if (req.file === undefined) {
//       return res.send(`You must select a file.`);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.send(`Error when trying upload images: ${error}`);
//   }
// };

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
      res.status(200).send({ data: updatedUser, message: 'User updated successfully' });
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
  uploadImage,
  updateImage
};
