const { Setting } = require('../models');

// const { cartService } = require('../services/cart.service');

const createSetting = async (couponBody) => {
  return Setting.create(couponBody);
};

const getSetting = async (id) => {
  const support = await Setting.findAndCountAll();
  return support;
};

const updateSettingById = async (newData) => {
  try {
    //const data = JSON.stringify(newData);
    if (newData.name) {
      return Setting.update(newData, { where: { name: newData.name } });
    }
  } catch (err) {
    console.log('err=====================', err);
  }
};

const deleteSettingById = async (id) => {
  try {
    const data = await Setting.findOne({ where: { id: id } });

    if (!data) {
      throw new Error('Coupon not found');
    }
    data.status = 0;
    await data.save();

    console.log('Coupon deleted successfully');

    return { message: 'Coupon deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createSetting,
  getSetting,
  deleteSettingById,
  updateSettingById
};
