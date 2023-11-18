const { Orders, OrderDetails, Users, Product } = require('../models');
// const orderDetails = require('../models/orderDetails');

const createOrder = async (_userBody) => {
  const userBody = _userBody;
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
    include: [{ model: Users }, { model: OrderDetails }],
    limit,
    offset
  });
  return support;
};

const getOrderById = async (id) => {
  try {
    const data = await Orders.findOne({
      where: { id: id },
      include: [{ model: Users }, { model: OrderDetails }]
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
  if (findData) {
    return Orders.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteOrderById = async (Id, userId) => {
  try {
    const data = await Orders.findOne({ where: Id });

    if (!data) {
      throw new Error('Orders not found');
    }
    data.status = 0;
    await data.save();

    console.log('Orders deleted successfully');

    return { message: 'Orders deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// For users
const getOrderForUser = async (query, options, userId) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const result = await Orders.findAndCountAll({
    where: { userId: userId, isActive: true, status: true },
    order: [['updatedAt', 'DESC']],
    include: [
      {
        model: Users
      },
      {
        model: OrderDetails,
        include: [
          {
            model: Product
          }
        ]
      }
    ],
    limit,
    offset
  });

  // Compute totalAmount for each order based on its OrderDetails
  const ordersWithTotalAmount = result.rows.map((order) => {
    const totalAmount = order.OrderDetails.reduce((sum, detail) => sum + detail.amount, 0);
    order.dataValues.totalAmount = totalAmount;
    return order;
  });

  return {
    ...result,
    rows: ordersWithTotalAmount
  };
};

const createOrderForUser = async (_userBody, userId) => {
  let userBody = _userBody;
  userBody = {
    ...userBody,
    userId: userId
  };
  const data = await Orders.create(userBody);
  console.log('data', data);
  return data;
};

const updateOrderForUser = async (userId, newData, id) => {
  const findData = await Orders.findOne({
    where: { userId: userId }
  });
  if (findData) {
    return Orders.update(newData, { where: id });
  } else {
    return;
  }
};

const createOrderCheckout = async (userId) => {
  // userBody = {
  //   userId: userId
  // };
  const data = await Orders.create(userBody);
  console.log('data', data);
  return data;
};

module.exports = {
  createOrder,
  getOrder,
  updateOrderById,
  deleteOrderById,
  getOrderById,
  getOrderForUser,
  createOrderForUser,
  updateOrderForUser,
  createOrderCheckout
};
