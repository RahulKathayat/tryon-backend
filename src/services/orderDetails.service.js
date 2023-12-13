const { OrderDetails, Product, Orders, Users, Ratings, Address } = require('../models');
const { cancelShiprocketOrder } = require('../controllers/shipRocket.controller');
const { checkPaymentStatus } = require('./paymentLog.service');
const { where } = require('sequelize');

const createOrderDetails = async (_userBody) => {
  const userBody = _userBody;
  const data = await OrderDetails.create(userBody);
  console.log('data', data);
  return data;
};

const getOrderDetails = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await OrderDetails.findAndCountAll({
    where: query,
    include: [
      {
        model: Product
      },
      {
        model: Users,
        include: [
          {
            model: Address
          },
          {
            model: Ratings
          }
        ]
      }
    ],
    order: [['updatedAt', 'DESC']],
    limit,
    offset
  });
  return support;
};

const getOrderDetailsByOrderId = async (id) => {
  try {
    const data = await Orders.findAll({
      where: { id },
      include: [
        {
          model: OrderDetails,
          include: [
            {
              model: Product
            }
          ]
        },
        {
          model: Address
        },
        {
          model: Users,
          include: [
            {
              model: Ratings
            }
            // {
            //   model: Address
            // }
          ]
        }
      ]
    });
    return data;
  } catch (error) {
    console.error('orderDetails not found!!', error);
  }
};
const getOrderDetailsById = async (id) => {
  try {
    const data = await OrderDetails.findAll({
      where: { id: id },
      include: [
        {
          model: Product
        },
        {
          model: Orders,
          include: [
            {
              model: Users,
              include: [
                {
                  model: Ratings
                }
              ]
            }
          ]
        }
      ]
    });
    return data;
  } catch (error) {
    console.error('orderDetails not found!!', error);
  }
};

const updateOrderDetailsById = async (id, newData) => {
  const findData = await OrderDetails.findOne({
    where: id
  });
  if (findData) {
    await OrderDetails.update(newData, { where: id });
    const orderId = findData.dataValues.orderId;
    const findOrderDetails = await OrderDetails.findAndCountAll({ where: { orderId: orderId } });
    const checkProductStatus = findOrderDetails.rows.some((item) => item.dataValues.type === 'In Process');
    if (checkProductStatus) {
      return Orders.update({ orderStatus: 'In Process' }, { where: { id: orderId } });
    }
    return Orders.update({ orderStatus: 'Delivered' }, { where: { id: orderId } });
  }
};

const deleteOrderDetailsById = async (Id) => {
  try {
    const data = await OrderDetails.findOne({ where: Id });

    if (!data) {
      throw new Error('OrderDetails not found');
    }
    data.status = 0;
    await data.save();

    console.log('OrderDetails deleted successfully');

    return { message: 'OrderDetails deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// For users

const getOrderDetailsForUser = async (query, userId) => {
  const support = await OrderDetails.findAndCountAll({
    where: query,
    include: [
      {
        model: Product
      },
      {
        model: Orders,
        include: [
          {
            model: Users,
            include: [
              {
                model: Ratings
              }
            ]
          }
        ]
      }
    ],
    order: [['updatedAt', 'DESC']],
    limit,
    offset
  });
  return support;
};

// const manageOrder=async(orderDetailId,body)=>{
//   const result=await OrderDetails.findOne({
//     where: {id:orderDetailId}
//   })
//   if (result) {
//     return OrderDetails.update(body, { where: { id: orderDetailId } });
//   } else {
//     return;
//   }

// }

const manageOrder = async (orderDetailId, body) => {
  try {
    const result = await OrderDetails.findOne({
      where: { id: orderDetailId }
    });

    if (result) {
      await OrderDetails.update(body, { where: { id: orderDetailId } });

      if (body.type && body.type === 'Cancel') {
        const response = await cancelShiprocketOrder(orderDetailId);
        return 'Shiprocket order is cancelled successfully';
      }

      return 'Order details updated successfully';
    } else {
      return 'Order not found';
    }
  } catch (error) {
    console.error('Error managing order:', error);
    throw error;
  }
};

module.exports = {
  createOrderDetails,
  getOrderDetails,
  updateOrderDetailsById,
  deleteOrderDetailsById,
  getOrderDetailsById,
  getOrderDetailsForUser,
  getOrderDetailsByOrderId,
  manageOrder
};
