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
    console.error('payment not found!!', error);
  }
};

const getPaymentById = async (id) => {
  try {
    const data = await Payment.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('payment not found!!', error);
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


const deletePaymentById = async (Id) => {
  try {
    const user = await Payment.findOne({ where:   Id  });

    if (!user) {
      throw new Error('Payment not found');
    }
    await user.update({ status: false });

    console.log("Payment deleted successfully");

    return { message: 'Payment deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  createPayment,
  getPayment,
  updatePaymentById,
  deletePaymentById,
  getPaymentById
  
};
