const { Orders } = require('../models');

const createOrder = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await Orders.create(userBody);
   console.log("data",data);
   return data
};

const getOrder = async () => {
  try {
    const data = await Orders.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('order not found!!', error);
  }
};

const getOrderById = async (id) => {
  try {
    const data = await Orders.findAll({
      where: {id:id}
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
}


const deleteOrderById = async (id) => {
  return Orders.destroy({
    where: id
  });
};

module.exports = {
    createOrder,
    getOrder,
    updateOrderById,
    deleteOrderById,
    getOrderById
  
};
