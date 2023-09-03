const { OrderDetails } = require('../models');

const createOrderDetails = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await OrderDetails.create(userBody);
   console.log("data",data);
   return data
};

const getOrderDetails = async () => {
  try {
    const data = await OrderDetails.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
  }
};

const getOrderDetailsById = async (id) => {
  try {
    const data = await OrderDetails.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
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


const deleteOrderDetailsById = async (id) => {
  return OrderDetails.destroy({
    where: id
  });
};

module.exports = {
    createOrderDetails,
    getOrderDetails,
    updateOrderDetailsById,
    deleteOrderDetailsById,
    getOrderDetailsById
  
};
