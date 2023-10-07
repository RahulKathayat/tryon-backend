const catchAsync = require('../utils/catchAsync');
const fabricService = require('../services/fabric.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Op } = require('sequelize');

const createFabric = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await fabricService.createFabric(userBody);
  if (data) {
    await res.status(200).send({ message: 'fabric created successfully' });
  } else {
    await res.status(404).send({ message: 'fabric not created' });
  }
});

const getFabric = catchAsync(async (req, res) => {
  let query = {};
  query.status = req.query.status ? req.query.status : true;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const between = pick(req.query, ['priceFrom', 'priceTo']);

  const filterParameters = [
    'fabricName',
    'fabricType',
    'weight',
    'printType',
    'usage',
    'properties',
    'handle',
    'construction',
    'transparency',
    'reflection',
    'price',
    'maxWidth',
    'gsm',
    'quantity'

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

  const data = await fabricService.getFabric(query, options,between);

  if (data) {
    res.status(httpStatus.OK).send({ message: 'Fabric data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetching data' });
  }
});


const getFabricById = catchAsync(async (req, res) => {
  const data = await fabricService.getFabricById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'fabric data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateFabric = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await fabricService.updateFabricById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'fabric updated successfully' });
    } else {
      res.status(404).send({ message: 'fabric not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating fabric:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteFabric = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await fabricService.deleteFabricById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'fabric deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fabric delete' });
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
  createFabric,
  deleteFabric,
  getFabric,
  updateFabric,
  getFabricById,
  uploadImage
};
