const catchAsync = require('../utils/catchAsync');
const fabricService = require('../services/fabric.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Op } = require('sequelize');



const   createFabric= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await fabricService.createFabric(userBody);
  if (data) {
    await res.status(200).send({ message: 'fabric created successfully' });
  } else {
    await res.status(404).send({ message: 'fabric not created' });
  }
});



const getFabric = catchAsync(async (req, res) => {
  const query ={};
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const { fabricType, weight, printType, usage, properties, handle,
  construction,transparency,reflection,price,maxWidth,gsm } = req.query;
  
  fabricType ? (query.fabricType = { [Op.like]: `%${fabricType}%` }) : null;
  weight ? (query.weight = { [Op.like]: `%${weight}%` }) : null;
  printType ? (query.printType = { [Op.like]: `%${printType}%` }) : null;
  usage ? (query.usage = { [Op.like]: `%${usage}%` }) : null;
  properties ? (query.properties = { [Op.like]: `%${properties}%` }) : null;
  handle ? (query.handle = { [Op.like]: `%${handle}%` }) : null;
  construction ? (query.construction = { [Op.like]: `%${construction}%` }) : null;
  transparency ? (query.transparency = { [Op.like]: `%${transparency}%` }) : null;
  reflection ? (query.reflection = { [Op.like]: `%${reflection}%` }) : null;
  price ? (query.price = { [Op.like]: `%${price}%` }) : null;
  maxWidth ? (query.maxWidth = { [Op.like]: `%${maxWidth}%` }) : null;
  gsm ? (query.gsm = { [Op.like]: `%${gsm}%` }) : null;
 

const data = await fabricService.getFabric(query,options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'fabric data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
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
    const updatedUser = await fabricService.updatefabricById(userId, newData);
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
module.exports = {
    createFabric,
    deleteFabric,
    getFabric,
    updateFabric,
    getFabricById
};
