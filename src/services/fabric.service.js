const { Fabric } = require('../models');
const { Op } = require('sequelize');

const createFabric = async (_userBody) => {
  const userBody = _userBody;
  console.log('===============', userBody);
  const data = await Fabric.create(userBody);
  console.log('data', data);
  return data;
};

const getFabric = async (query, options, between) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;

  if (between.priceFrom && between.priceTo) {
    query.price = {
      [Op.between]: [between.priceFrom, between.priceTo]
    };
  } else if (between.priceFrom) {
    query.price = {
      [Op.gte]: between.priceFrom
    };
  } else if (between.priceTo) {
    query.price = {
      [Op.lte]: between.priceTo
    };
  }

  const support = await Fabric.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    limit,
    offset
  });
  return support;
};

const getFabricById = async (id) => {
  try {
    const data = await Fabric.findAll({
      where: { id: id }
    });
    return data;
  } catch (error) {
    console.error('fabric not found!!', error);
  }
};

const updateFabricById = async (id, newData) => {
  const findData = await Fabric.findOne({
    where: id
  });
  if (findData) {
    return Fabric.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteFabricById = async (Id) => {
  try {
    const user = await Fabric.findOne({ where: Id });

    if (!user) {
      throw new Error('Fabric not found');
    }
    await user.update({ status: false });

    console.log('Fabric deleted successfully');

    return { message: 'Fabric deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  createFabric,
  getFabric,
  updateFabricById,
  deleteFabricById,
  getFabricById
};
