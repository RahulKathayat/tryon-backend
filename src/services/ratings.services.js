const { Ratings, Users, Product } = require('../models');

const createRatings = async (_userBody) => {
  const userBody = _userBody;
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

const updateRatingsById = async (id, newData) => {
  const findData = await Ratings.findOne({
    where: id
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

module.exports = {
  createRatings,
  getRatings,
  updateRatingsById,
  deleteRatingsById,
  getRatingsById
};
