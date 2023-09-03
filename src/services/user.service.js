// const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { Users } = require('../models');

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
const getUserWithSecretFields=async()=>{
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    console.log('user==========================', user);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (err) {
    console.log(err);
  }
}
const getUser = async () => {
  try {
    const data = await Users.findAll();
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const getUserById=async(id)=>{
  try{
    console.log("id======================",id);
    const data= await Users.findOne({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('Error retrieving user by id:', error);
    throw error;
  }
};


const getUserByEmail = async (email) => {
  try {
    console.log("email=============",email);
    const data = await Users.findOne({
      where: {email:email}
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
    where: id
  });
  if (findData) {
    return Users.update(newData, { where: id });
  } else {
    return;
  }
}






const deleteUserById = async (id) => {
  try {
    const deletedRowsCount = await Users.destroy({
      where: { id: id }
    });
    return deletedRowsCount;
  } catch (error) {
    console.error('Error deleting user by id:', error);
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
