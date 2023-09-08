const catchAsync = require('../utils/catchAsync');
const subSubCategoryService = require('../services/subSubCategory.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');


const   createSubSubCategory= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await subSubCategoryService.createSubSubCategory(userBody);
  if (data) {
    await res.status(200).send({ message: 'subSubCategory created successfully' });
  } else {
    await res.status(404).send({ message: 'subSubCategory not created' });
  }
});



const getSubSubCategory = catchAsync(async (req, res) => {
  const query ={};
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await subSubCategoryService.getSubSubCategory(query,options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'subSubCategory data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getAllCategories = catchAsync(async (req, res) => {
  
  const data = await subSubCategoryService.getAllCategories();
  if (data) {
    res.status(httpStatus.OK).send({ message: 'subSubCategory data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getSubSubCategoryById = catchAsync(async (req, res) => {
  const data = await subSubCategoryService.getSubSubCategoryById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'subSubCategory data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateSubSubCategory = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await subSubCategoryService.updateSubSubCategoryById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'subSubCategory updated successfully' });
    } else {
      res.status(404).send({ message: 'subSubCategory not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating subSubCategory:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteSubSubCategory = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await subSubCategoryService.deleteSubSubCategoryById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'subSubCategory deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in subSubCategory delete' });
  }
});
module.exports = {
    createSubSubCategory,
    deleteSubSubCategory,
    getSubSubCategory,
    updateSubSubCategory,
    getSubSubCategoryById,
    getAllCategories
};
