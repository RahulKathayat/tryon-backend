const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const { Users, Address } = require('../models');

const createUser = async (_userBody) => {
  try {
    const userBody = _userBody;
    userBody.password = await bcrypt.hash(userBody.password, 8);
    const createdUser = await Users.create(userBody);

    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
const getUserWithSecretFields = async () => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    console.log('user==========================', user);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Users.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: Address }],
    limit,
    offset
  });
  return support;
};

const getUserById = async (id) => {
  try {
    console.log('id======================', id);
    const data = await Users.findOne({
      where: { id: id },
      include: [
        {
          model: Address
        }
      ]
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    console.log('email=============', email);
    const data = await Users.findOne({
      where: { email: email }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
};

//update user
const updateUserById = async (id, newData) => {
  const findData = await Users.findOne({
    where: { id: id }
  });
  if (findData) {
    return Users.update(newData, { where: { id: id } });
  } else {
    return;
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await Users.findOne({ where: userId });

    if (!user) {
      throw new Error('User not found');
    }
    await user.update({ status: false });

    console.log('User deleted successfully');

    return { message: 'User deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserWithSecretFieldsById = async (id) => {
  try {
    console.log(id);
    const user = await Users.scope('withSecretColumns').findOne({
      where: { id: id }
    });
    return user;
  } catch (error) {
    console.error('Error retrieving user with secret fields by id:', error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  updateUserById,
  deleteUserById,
  getUserWithSecretFieldsById,
  getUserByEmail,
  getUserById,
  getUserWithSecretFields
};
