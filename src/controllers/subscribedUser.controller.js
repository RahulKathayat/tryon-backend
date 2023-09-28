const catchAsync = require('../utils/catchAsync');
const subscribedUserService = require('../services/subscribedUser.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const createSubscribedUser = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await subscribedUserService.createSubscribedUser(userBody);
  if (data) {
    await res.status(200).send({ message: 'SubscribedUser created successfully' });
  } else {
    await res.status(404).send({ message: 'SubscribedUser not created' });
  }
});


const getSubscribedUser = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const data = await subscribedUserService.getSubscribedUser(query, options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'SubscribedUser data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const deleteSubscribedUser = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await subscribedUserService.deleteSubscribedUserById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'SubscribedUser deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in SubscribedUser delete' });
  }
});
module.exports = {
    createSubscribedUser,
    deleteSubscribedUser,
    getSubscribedUser,

};
