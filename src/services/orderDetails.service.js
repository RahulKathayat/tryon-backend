const { OrderDetails } = require('../models');

const createOrderDetails = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await OrderDetails.create(userBody);
   console.log("data",data);
   return data
};

const getOrderDetails = async (query, options) => {

  const limit = Number(options.limit) ;
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await OrderDetails.findAndCountAll({
    where:  query,
    order: [['updatedAt', 'DESC']],
    limit,
    offset
  });
  return support;
};


const getOrderDetailsById = async (id) => {
  try {
    const data = await OrderDetails.findAll({
      where: {id:id},

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
}

const deleteOrderDetailsById = async (Id) => {
  try {
    const user = await OrderDetails.findOne({ where:   Id  });

    if (!user) {
      throw new Error('OrderDetails not found');
    }
    await user.update({ status: false });

    console.log("OrderDetails deleted successfully");

    return { message: 'OrderDetails deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
    createOrderDetails,
    getOrderDetails,
    updateOrderDetailsById,
    deleteOrderDetailsById,
    getOrderDetailsById
  
};
