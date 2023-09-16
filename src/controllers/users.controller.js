const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const cartService = require('../services/cart.service');

const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Op } = require('sequelize');
// const { cartService } = require('../services');




//create user
const   createUser= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await userService.createUser(userBody);
  console.log("object=====================",req.user.id);
  const createCart=await cartService.createCart(req.user.id);
  if (data) {
    await res.status(200).send({ message: 'user created successfully' });
  } else {
    await res.status(404).send({ message: 'User not created' });
  }
});


//get user
const getUser = catchAsync(async (req, res) => {
  let query ={};
  query.role="Customer";
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const filter = pick(req.query, ['role']);

  if (filter) {
    if (filter.role) {
      query.role = filter.role;
    }
  }

  const { firstName,lastName,phoneNumber,email,emailVerify,addressId,dob } = req.query;
  firstName ? query.firstName = { [Op.like]: `%${firstName}%` } : null;
  lastName ? query.lastName = { [Op.like]: `%${lastName}%` } : null;
  phoneNumber ? query.phoneNumber = { [Op.like]: `%${phoneNumber}%` } : null;
  email ? query.email = { [Op.like]: `%${email}%` } : null;
  emailVerify ? query.emailVerify = { [Op.like]: `%${emailVerify}%` } : null;
  addressId ? query.addressId = { [Op.like]: `%${addressId}%` } : null;
  dob ? query.dob = { [Op.like]: `%${dob}%` } : null;


  const data = await userService.getUser(query,options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'user data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});






const getUserById=catchAsync(async (req,res)=>{
  const data = await userService.getUserById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'user data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
})

const getUserByEmail=catchAsync(async(req,res)=>{
  const query=req.query.email
  const data=await userService.getUserByEmail(query);
  if(data){
    res.status(httpStatus.OK).send({ message: 'user data by email is fetched successfully', data: data });
  }
  else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
})


//update user
const updateUser = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await userService.updateUserById(userId, newData);
    if (updatedUser) {
      res.status(200).send({message: 'user updated successfully' });
    } else {
      res.status(404).send({ message: 'user not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



//delete user
const deleteUser = catchAsync(async (req, res) => {
  const querry = req.params;
  const deleteUser = await userService.deleteUserById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'user deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in User delete' });
  }
});
module.exports = {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  getUserById,
  getUserByEmail,
}
