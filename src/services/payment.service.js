const { Payment } = require('../models');

const createPayment = async (_userBody) => {
  const userBody = _userBody;
  return Payment.create(userBody);
};

const getPayment = async () => {
  try {
    const data = await Payment.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
  }
};

const getPaymentById = async (id) => {
  try {
    const data = await Payment.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
  }
};

const updatePaymentById = async (id, newData) => {
  const findData = await Payment.findOne({
    where: id
  });
  if (findData) {
    return Payment.update(newData, { where: id });
  } else {
    return;
  }
}


const deletePaymentById = async (id) => {
  return Payment.destroy({
    where: id
  });
};

module.exports = {
  createPayment,
  getPayment,
  updatePaymentById,
  deletePaymentById,
  getPaymentById
  
};
