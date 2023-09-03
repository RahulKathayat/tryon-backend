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
    console.error('card not found!!', error);
  }
};

const getRefundById = async (id) => {
  try {
    const data = await Refund.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
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


const deleteRefundById = async (id) => {
  return Refund.destroy({
    where: id
  });
};

module.exports = {
  createRefund,
  getRefund,
  updateRefundById,
  deleteRefundById,
  getRefundById
  
};
