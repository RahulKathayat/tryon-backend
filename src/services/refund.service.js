const { Refund } = require('../models');

const createRefund = async (_userBody) => {
  const userBody = _userBody;
  return Refund.create(userBody);
};

const getRefund = async () => {
  try {
    const data = await Refund.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('refund not found!!', error);
  }
};

const getRefundById = async (id) => {
  try {
    const data = await Refund.findAll({
      where: {id:id}
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
}


const deleteRefundById = async (Id) => {
  try {
    const user = await Refund.findOne({ where:   Id  });

    if (!user) {
      throw new Error('Refund not found');
    }
    await user.update({ status: false });

    console.log("Refund deleted successfully");

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
