const { Setting } = require('../models');

const createData = {
  DISCOUNT_BANNER: ['1700323521083-9a66ad24-5199-4edf-ac14-8018090e3112-6fe1170c97934bca9b47afb100ebc516_9366.webp'],
  CMS: 'Lorem ipsum '
};
const createData2 = {
  DISCOUNT_BANNER: ['1700323521083-9a66ad24-5199-4edf-ac14-8018090e3112-6fe1170c97934bca9b47afb100ebc516_9366.webp'],
  CMS: 'dsdskff jdfknds dfdskfds '
};

const createDiscountBanner = async () => {
  const findDiscountBanner = await Setting.findOne();
  if (!findDiscountBanner) {
    await Setting.create(createData);
    await Setting.create(createData2);
  }
};
module.exports = { createDiscountBanner };
