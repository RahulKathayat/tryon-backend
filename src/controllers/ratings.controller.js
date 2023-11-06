const catchAsync = require('../utils/catchAsync');
const ratingsService = require('../services/ratings.services');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { productService } = require('../services');

const createRatings = catchAsync(async (req, res) => {
  const userId = req.user.id;
  let userBody = req.body;
  const data = await ratingsService.createRatings(userBody, userId);
  if (data) {
    const getAvrageRatings = await ratingsService.calculateAverageRatings();
    if (getAvrageRatings) {
      const updateAvrageRatings = await productService.updateAvrageRatings(getAvrageRatings);
    }
  }
  if (data) {
    await res.status(200).send({ message: 'ratings created successfully' });
  } else {
    await res.status(404).send({ message: 'ratings not created' });
  }
});

const getRatings = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await ratingsService.getRatings(query, options);
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
    const userId = req.user.id;
    const id = req.params;
    const newData = req.body;
    console.log('new data===============================', newData, id, userId);
    const updatedUser = await ratingsService.updateRatingsById(id, userId, newData);
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

  const deleteUser = await ratingsService.deleteRatingsById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'ratings deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});

const getUserRatings = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await ratingsService.getUserRatings(query, options, userId);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'ratings data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const deleteUserRatings = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const querry = req.params;
  const deleteUser = await ratingsService.deleteUserRatings(querry, userId);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'ratings deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
  }
});

const averageRating = catchAsync(async (req, res) => {
  try {
    await ratingsService.calculateAverageRatings();
  } catch (error) {
    console.error('Error calculating average ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = {
  createRatings,
  deleteRatings,
  getRatings,
  updateRatings,
  getRatingsById,
  getUserRatings,
  deleteUserRatings,
  averageRating
};
