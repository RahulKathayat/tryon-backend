const { Address, Users } = require('../models');

const createAddress = async (_userBody, userId) => {
  let userBody = _userBody;
  console.log('===============', userBody);
  userBody = {
    ...userBody,
    userId: userId
  };
  const data = await Address.create(userBody);
  console.log('data', data);
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
  const findData = await Address.findOne({
    where: id
  });
  if (findData) {
    return Address.update(newData, { where: id });
  } else {
    return;
  }
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
