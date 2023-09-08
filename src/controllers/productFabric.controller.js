const catchAsync = require('../utils/catchAsync');
const productFabricService = require('../services/productFabric.services');
const httpStatus = require('http-status');
const pick = require('../utils/pick');


const   createProductFabric= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await productFabricService.createProductFabric(userBody);
  if (data) {
    await res.status(200).send({ message: 'ProductFabric created successfully' });
  } else {
    await res.status(404).send({ message: 'ProductFabric not created' });
  }
});



const getProductFabric = catchAsync(async (req, res) => {
  const query ={};
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await productFabricService.getProductFabric(query,options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'ProductFabric data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getProductFabricById = catchAsync(async (req, res) => {
  const data = await productFabricService.getProductFabricById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'ProductFabric data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateProductFabric = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await productFabricService.updateProductfabricById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'ProductFabric updated successfully' });
    } else {
      res.status(404).send({ message: 'ProductFabric not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating ProductFabric:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteProductFabric = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await productFabricService.deleteProductFabricById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'ProductFabric deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in ProductFabric delete' });
  }
});
module.exports = {
    createProductFabric,
    deleteProductFabric,
    getProductFabric,
    updateProductFabric,
    getProductFabricById
};
