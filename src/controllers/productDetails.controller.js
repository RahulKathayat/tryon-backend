const catchAsync = require('../utils/catchAsync');
const productDetailService = require('../services/productDetail.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');


const   createProductDetail= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await productDetailService.createProductDetail(userBody);
  if (data) {
    await res.status(200).send({ message: 'product detail created successfully' });
  } else {
    await res.status(404).send({ message: 'product detail not created' });
  }
});



const getProductDetail = catchAsync(async (req, res) => {
  const query ={};
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await productDetailService.getProductDetail(query,options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'product detail data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getProductDetailById = catchAsync(async (req, res) => {
  const data = await productDetailService.getProductDetailById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'product detail data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateProductDetail = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await productDetailService.updateProductDetailById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'product detail updated successfully' });
    } else {
      res.status(404).send({ message: 'product detail not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteProductDetail = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await productDetailService.deleteProductDetailsById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'product detail deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});
module.exports = {
    createProductDetail,
  deleteProductDetail,
  getProductDetail,
  updateProductDetail,
  getProductDetailById
};
