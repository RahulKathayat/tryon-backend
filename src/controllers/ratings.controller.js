const catchAsync = require('../utils/catchAsync');
const ratingsService = require('../services/ratings.services');
const httpStatus = require('http-status');
const pick = require('../utils/pick');


const   createRatings= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await ratingsService.createRatings(userBody);
  if (data) {
    await res.status(200).send({ message: 'ratings created successfully' });
  } else {
    await res.status(404).send({ message: 'ratings not created' });
  }
});



const getRatings = catchAsync(async (req, res) => {
  const query ={};
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await ratingsService.getRatings(query,options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'ratings data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getRatingsById = catchAsync(async (req, res) => {
  const data = await ratingsService.getRatingsById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'ratings data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateRatings = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await ratingsService.updateRatingsById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'ratings updated successfully' });
    } else {
      res.status(404).send({ message: 'ratings not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteRatings = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await ratingsService.deleteRefundById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'ratings deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});
module.exports = {
  createRatings,
  deleteRatings,
  getRatings,
  updateRatings,
  getRatingsById
};
