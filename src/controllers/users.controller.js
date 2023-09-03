const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const httpStatus = require('http-status');

//create user
const   createUser= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await userService.createUser(userBody);
  if (data) {
    await res.status(200).send({ message: 'user created successfully' });
  } else {
    await res.status(404).send({ message: 'User not created' });
  }
});


//get user
const getUser = catchAsync(async (req, res) => {
  const data = await userService.getUser();
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
      res.status(200).send({ data: updatedUser, message: 'user updated successfully' });
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
