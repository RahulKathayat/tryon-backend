const catchAsync = require('../utils/catchAsync');
const subCategoryService = require('../services/subCategory.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Op } = require('sequelize');


const createSubCategory = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await subCategoryService.createSubCategory(userBody);
  if (data) {
    await res.status(200).send({ message: 'subCategory created successfully' });
  } else {
    await res.status(404).send({ message: 'subCategory not created' });
  }
});


const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      const originalFilePath = req.file.filename;
      return res.status(200).send({ message: 'File has been uploaded ', pic: originalFilePath });
    } else {
      return res.status(400).send({ message: 'You must select a file.' });
    }
  } catch (error) {
    console.log('error', error);
    return res.status(500).send({ message: `Error when trying to upload and process images: ${error.message}` });
  }
};

const getSubCategory = catchAsync(async (req, res) => {
  let query = {};
  query.status = req.query.status ? req.query.status : true;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const filterParameters = [
    'subCategoryName', 
    'categoryId', 
];

  filterParameters.forEach(param => {
    if (req.query[param]) {
      if (req.query[param].includes(',')) {
        const values = req.query[param].split(',');
        query[param] = {
          [Op.or]: values.map(value => ({
            [Op.like]: `%${value.trim()}%`,
          })),
        };
      } else {
        query[param] = {
          [Op.like]: `%${req.query[param]}%`,
        };
      }
    }
  });

  const data = await subCategoryService.getSubCategory(query, options);

  if (data) {
    res.status(httpStatus.OK).send({ message: 'category data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
});




const getAllSubCategory = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const data = await subCategoryService.getAllSubCategory(query);
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
  getSubCategoryById,
  getAllSubCategory,
  uploadImage
};
