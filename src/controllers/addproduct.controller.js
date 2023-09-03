const catchAsync = require('../utils/catchAsync');
const { addProductService } = require('../services');
const httpStatus = require('http-status');

const createAddProduct = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await addProductService.createAddProduct(userBody);
  if (data) {
    await res.status(200).send({ message: 'add product created successfully' });
  } else {
    await res.status(404).send({ message: 'product not added' });
  }
});

const getAddProduct = catchAsync(async (req, res) => {
  const data = await addProductService.getAddProduct();
  if (data) {
    res.status(httpStatus.OK).send({ message: 'add product  data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});
const getAddProductById = catchAsync(async (req, res) => {
  const data = await addProductService.getAddProductById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'add product  by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getAddProductByEmail = catchAsync(async (req, res) => {
  const query = req.query.email;
  console.log('check query email-----------------', query);
  const data = await addProductService.getAddProductByEmail(query);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'add product  data by email is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateAddProduct = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await addProductService.updateAddProductById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'add product  updated successfully' });
    } else {
      res.status(404).send({ message: 'add product  not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating wallet:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteAddProduct = catchAsync(async (req, res) => {
  const querry = req.params;
  const deleteUser = await addProductService.deleteAddProductById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'add product  deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in User delete' });
  }
});
module.exports = {
  createAddProduct,
  deleteAddProduct,
  getAddProduct,
  updateAddProduct,
  getAddProductById,
  getAddProductByEmail
};