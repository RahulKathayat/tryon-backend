const catchAsync = require('../utils/catchAsync');
const subCategoryService = require('../services/subCategory.service');
const httpStatus = require('http-status');

const   createSubCategory= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await subCategoryService.createSubCategory(userBody);
  if (data) {
    await res.status(200).send({ message: 'subCategory created successfully' });
  } else {
    await res.status(404).send({ message: 'subCategory not created' });
  }
});



const getSubCategory = catchAsync(async (req, res) => {
  const data = await subCategoryService.getSubCategory();
  if (data) {
    res.status(httpStatus.OK).send({ message: 'subCategory data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getSubCategoryById = catchAsync(async (req, res) => {
  const data = await subCategoryService.getSubCategoryById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'subCategory data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateSubCategory = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await subCategoryService.updateSubCategoryById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'subCategory updated successfully' });
    } else {
      res.status(404).send({ message: 'subCategory not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating subCategory:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteSubCategory = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await subCategoryService.deleteSubCategoryById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'subCategory deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in subCategory delete' });
  }
});
module.exports = {
    createSubCategory,
    deleteSubCategory,
    getSubCategory,
    updateSubCategory,
    getSubCategoryById
};
