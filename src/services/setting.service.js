const { Setting } = require('../models');

// const { cartService } = require('../services/cart.service');

const createSetting = async (couponBody) => {
  return Setting.create(couponBody);
};

const getSetting = async (id) => {
  const support = await Setting.findAndCountAll();
  return support;
};

const updateSettingById = async (id, newData) => {
  try {
    const data = JSON.stringify(newData);
    console.log('newdata------------------', newData);
    if (newData.NAME) {
      return Setting.update({ CMS: data }, { where: { id: id } });
    }
    return Setting.update({ DISCOUNT_BANNER: data }, { where: { id: id } });
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
