const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { AddProduct } = require('../models');
const createAddProduct = async (_userBody) => {
  try {
    const userBody = _userBody;
    const createdUser = await AddProduct.create(userBody);
    return createdUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
const getAddProduct = async () => {
  try {
    const data = await AddProduct.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};
const getAddProductById = async (id) => {
  try {
    console.log('id======================', id);
    const data = await AddProduct.findOne({
      where: { id: id }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    throw error;
  }
};
const getAddProductByEmail = async (email) => {
  try {
    const data = await AddProduct.findOne({
      where: { email: email }
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by email:', error);
    throw error;
  }
};
//update user
const updateAddProductById = async (query, newData) => {
  const id = query.id;
  console.log(id, '==================');
  const findData = await AddProduct.findOne({
    where: { id: id }
  });
  if (findData) {
    return findData.update(newData, { where: { id: id } });
  } else {
    return;
  }
};
const deleteAddProductById = async (id) => {
  try {
    const deletedRowsCount = await AddProduct.destroy({
      where: { id: id }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting user by id:', error);
    throw error;
  }
};
const getAddProductWithSecretFieldsById = async (id) => {
  try {
    const user = await AddProduct.scope('withSecretColumns').findOne({
      where: { id: id }
    });
    return user;
  } catch (error) {
    console.error('Error retrieving user with secret fields by id:', error);
    throw error;
  }
};
module.exports = {
    createAddProduct,
  getAddProduct,
  updateAddProductById,
  deleteAddProductById,
  getAddProductWithSecretFieldsById,
  getAddProductByEmail,
  getAddProductById
};