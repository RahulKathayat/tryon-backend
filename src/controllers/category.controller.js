const catchAsync = require('../utils/catchAsync');
const categoryService = require('../services/category.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const   createCategory= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await categoryService.createCategory(userBody);
  if (data) {
    await res.status(200).send({ message: 'category created successfully' });
  } else {
    await res.status(404).send({ message: 'category not created' });
  }
});



const getCategory = catchAsync(async (req, res) => {
  const query ={};
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await categoryService.getCategory(query,options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'category data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getAllCategory = catchAsync(async (req, res) => {
  const query={}
  query.status = req.query.status?req.query.status:true;
  const data = await categoryService.getAllCategory(query);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Category data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getCategoryById = catchAsync(async (req, res) => {
  const data = await categoryService.getCategoryById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'category data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateCategory = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await categoryService.updateCategoryById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'category updated successfully' });
    } else {
      res.status(404).send({ message: 'category not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteCategory = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await categoryService.deleteCategoryById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'category deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in category delete' });
  }
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'You must select a file.' });
    }
    const originalFilePath = req.file.filename;

    return res.status(200).send({ message: 'File has been uploaded ', pic: originalFilePath });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: `Error when trying to upload and process images: ${error.message}` });
  }
};
module.exports = {
    createCategory,
    deleteCategory,
    getCategory,
    updateCategory,
    getCategoryById,
    getAllCategory,
    uploadImage
};
