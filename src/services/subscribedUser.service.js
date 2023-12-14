const { SubscribedUser } = require('../models');
const logger = require('../config/logger');
const messages = require('../constant/message.json');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const createSubscribedUser = async (_userBody) => {
  const userBody = _userBody;
  if (await getExistingEmails(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.EMAIL_ALREADY_EXISTS);
  }
  const data = await SubscribedUser.create(userBody);
  console.log('data', data);
  return data;
};

const getExistingEmails = async (email) => {
  logger.info(email);
  return SubscribedUser.findOne({ where: { email, status: true } });
};

const getSubscribedUser = async (query, options) => {
  //   const limit = Number(options.limit) ;
  //   const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await SubscribedUser.findAndCountAll({
    where: { ...query }
  });
  return support;
};

const deleteSubscribedUserById = async (Id) => {
  try {
    const user = await SubscribedUser.findOne({ where: Id });

    if (!user) {
      throw new Error('SubscribedUser not found');
    }
    user.status = 0;
    await user.save();

    console.log('SubscribedUser deleted successfully');

    return { message: 'SubscribedUser deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateSubscribedUser = async (id, newData) => {
  try {
    const user = await SubscribedUser.findByPk(id);

    if (user) {
      await user.update(newData);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

module.exports = {
  createSubscribedUser,
  getSubscribedUser,
  deleteSubscribedUserById,
  getExistingEmails,
  updateSubscribedUser
};
