const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');
const httpStatus = require('http-status');

const   createCart= catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await cartService.createCart(userBody);
  if (data) {
    await res.status(200).send({ message: 'cart created successfully' });
  } else {
    await res.status(404).send({ message: 'cart not created' });
  }
});



const getCart = catchAsync(async (req, res) => {
  const data = await cartService.getCart();
  if (data) {
    res.status(httpStatus.OK).send({ message: 'cart data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getCartById = catchAsync(async (req, res) => {
  const data = await cartService.getCartById(req.params.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'cart data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});



const updateCart = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await cartService.updateCartById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'cart updated successfully' });
    } else {
      res.status(404).send({ message: 'cart not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});



const deleteCart = catchAsync(async (req, res) => {
  const querry = req.params;

  const deleteUser = await cartService.deleteCartById(querry);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'cart deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in cart delete' });
  }
});
module.exports = {
    createCart,
    deleteCart,
    getCart,
    updateCart,
  getCartById
};
