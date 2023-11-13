const { Refund, Orders, Users } = require('../models');

const createRefund = async (_userBody) => {
  const userBody = _userBody;
  return Refund.create(userBody);
};

const getRefund = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Refund.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: Orders }, { model: Users }],
    limit,
    offset
  });
  return support;
};

const getRefundById = async (id) => {
  try {
    const data = await Refund.findAll({
      where: { id: id },
      include: [{ model: Orders }, { model: Users }]
    });
    return data;
  } catch (error) {
    console.error('refund not found!!', error);
  }
};

const updateRefundById = async (id, newData) => {
  const findData = await Refund.findOne({
    where: id
  });
  if (findData) {
    return Refund.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteRefundById = async (Id) => {
  try {
    const data = await Refund.findOne({ where: Id });

    if (!data) {
      throw new Error('Refund not found');
    }
    data.status = 0;
    await data.save();

    console.log('Refund deleted successfully');

    return { message: 'Refund deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createRefund,
  getRefund,
  updateRefundById,
  deleteRefundById,
  getRefundById
};
