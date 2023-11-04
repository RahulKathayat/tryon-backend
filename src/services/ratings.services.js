const { Ratings, Users, Product, sequelize } = require('../models');
// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('');
const createRatings = async (_userBody, userId) => {
  let userBody = _userBody;
  userBody = {
    ...userBody,
    userId: userId
  };
  return Ratings.create(userBody);
};

const getRatings = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Ratings.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: Users }, { model: Product }],
    limit,
    offset
  });
  return support;
};

const getRatingsById = async (id) => {
  try {
    const data = await Ratings.findAll({
      where: { id: id },
      include: [{ model: Users }, { model: Product }]
    });
    return data;
  } catch (error) {
    console.error('ratings not found!!', error);
  }
};

const updateRatingsById = async (id, userId, newData) => {
  const findData = await Ratings.findOne({
    where: { userId: userId }
  });
  if (findData) {
    return Ratings.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteRatingsById = async (Id) => {
  try {
    const user = await Ratings.findOne({ where: Id });

    if (!user) {
      throw new Error('Ratings not found');
    }
    await user.update({ status: false });

    console.log('Ratings deleted successfully');

    return { message: 'Ratings deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserRatings = async (query, options, userId) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Ratings.findAndCountAll({
    where: { userId: userId },
    order: [['updatedAt', 'DESC']],
    include: [{ model: Users }, { model: Product }],
    limit,
    offset
  });
  return support;
};

const deleteUserRatings = async (Id, userId) => {
  try {
    const user = await Ratings.findOne({ where: Id });

    if (!user) {
      throw new Error('Ratings not found');
    }
    await user.update({ status: false });

    console.log('Ratings deleted successfully');

    return { message: 'Ratings deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const calculateAverageRatings = async () => {
  try {
    const [results] = await sequelize.query(`
      SELECT productId, AVG(ratings) AS averageRating
      FROM Ratings
      GROUP BY productId
    `);
    console.log('Average ratings calculated successfully', results);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { calculateAverageRatings };

module.exports = {
  createRatings,
  getRatings,
  updateRatingsById,
  deleteRatingsById,
  getRatingsById,
  getUserRatings,
  deleteUserRatings,
  calculateAverageRatings
};
