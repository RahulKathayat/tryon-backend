<<<<<<< HEAD
const { OrderDetails, Product, Orders, Users, Ratings } = require('../models');
=======
const { OrderDetails, Product, Orders, Users,Ratings } = require('../models');
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0

const createOrderDetails = async (_userBody) => {
  const userBody = _userBody;
  console.log('===============', userBody);
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
        model: Orders,
        include: [
          {
            model: Users,
<<<<<<< HEAD
            include: [
=======
            include:[
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0
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

const getOrderDetailsByOrderId = async (id) => {
  try {
    const data = await OrderDetails.findAll({
      where: { orderId: id },
      include: [
        {
          model: Product
        },
        {
          model: Orders,
          include: [
            {
              model: Users,
<<<<<<< HEAD
              include: [
=======
              include:[
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0
                {
                  model: Ratings
                }
              ]
            }
          ]
        }
<<<<<<< HEAD
      ]
=======
      ],
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0
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
<<<<<<< HEAD
              include: [
=======
              include:[
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0
                {
                  model: Ratings
                }
              ]
            }
          ]
        }
<<<<<<< HEAD
      ]
=======
      ],
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0
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
    return OrderDetails.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteOrderDetailsById = async (Id) => {
  try {
    const user = await OrderDetails.findOne({ where: Id });

    if (!user) {
      throw new Error('OrderDetails not found');
    }
    await user.update({ status: false });

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
<<<<<<< HEAD
            include: [
=======
            include:[
>>>>>>> 85adc015d4b9977b319af59204b2106e1446a0a0
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
module.exports = {
  createOrderDetails,
  getOrderDetails,
  updateOrderDetailsById,
  deleteOrderDetailsById,
  getOrderDetailsById,
  getOrderDetailsForUser,
  getOrderDetailsByOrderId
};
