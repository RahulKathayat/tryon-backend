const { Orders, OrderDetails, Users, Product } = require('../models');
// const orderDetails = require('../models/orderDetails');

const createOrder = async (_userBody) => {
  const userBody = _userBody;
  console.log('===============', userBody);
  const data = await Orders.create(userBody);
  console.log('data', data);
  return data;
};

const getOrder = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Orders.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: OrderDetails }, { model: Users }, { model: Product }],
    limit,
    offset
  });
  return support;
};

const getOrderById = async (id) => {
  try {
    const data = await Orders.findOne({
      where: { id: id },
      include: [{ model: OrderDetails }, { model: Users }, { model: Product }]
    });
    return data;
  } catch (error) {
    console.error('order not found!!', error);
  }
};

const updateOrderById = async (id, newData) => {
  const findData = await Orders.findOne({
    where: id
  });
  console.log('FINDdTAA============================', findData);
  if (findData) {
    return Orders.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteOrderById = async (Id) => {
  try {
    const user = await Orders.findOne({ where: Id });

    if (!user) {
      throw new Error('Orders not found');
    }
    await user.update({ status: false });

    console.log('Orders deleted successfully');

    return { message: 'Orders deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createOrder,
  getOrder,
  updateOrderById,
  deleteOrderById,
  getOrderById
};
