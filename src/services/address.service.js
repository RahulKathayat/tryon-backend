const { Address, Users } = require('../models');
const { Op } = require('sequelize');

const createAddress = async (addressData, userId) => {
  // If the new address is set as default
  if (addressData.defaultAddress) {
    // Set all other addresses for the user to not be the default
    await Address.update({ defaultAddress: false }, { where: { userId: userId } });
  }

  // Now, create the new address
  const data = await Address.create({
    ...addressData,
    userId
  });

  return data;
};

const getAddressMe = async (userId) => {
  const findData = await Address.findAll({
    where: { userId: userId },
    order: [['createdAt', 'ASC']]
  });
  return findData;
};
const getAddress = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Address.findAndCountAll({
    where: query,
    order: [['createdAt', 'DESC']],
    include: [{ model: Users }],
    limit,
    offset
  });
  return support;
};

const getAddressById = async (id) => {
  try {
    const data = await Address.findAll({
      where: { id: id },
      order: [['createdAt', 'DESC']]
    });
    console.log('data=============', data);
    return data;
  } catch (error) {
    console.error('address not found!!', error);
  }
};

const updateAddressById = async (newData, id) => {
  const findData = await Address.findOne({ where: id });

  if (!findData) {
    return null; // Address not found
  }
  if (newData.defaultAddress) {
    await Address.update({ defaultAddress: false }, { where: { userId: findData.userId, id: { [Op.ne]: id.id } } });
  }

  await Address.update(newData, { where: id });

  return newData;
};

const deleteAddressById = async (Id) => {
  try {
    const user = await Address.findOne({ where: Id });

    if (!user) {
      throw new Error('Address not found');
    }
    await user.update({ status: false });

    console.log('Address deleted successfully');

    return { message: 'Address deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const setDefaultAddress = async (addressId, userId) => {
  try {
    await Address.update(
      { defaultAddress: false },
      {
        where: { userId: userId }
      }
    );

    await Address.update(
      { defaultAddress: true },
      {
        where: { id: addressId, userId: userId }
      }
    );

    return true;
  } catch (error) {
    console.error('Error setting default address:', error);
    throw error;
  }
};

module.exports = {
  createAddress,
  getAddress,
  updateAddressById,
  deleteAddressById,
  getAddressById,
  getAddressMe,
  setDefaultAddress
};
