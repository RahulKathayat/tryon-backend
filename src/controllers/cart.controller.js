const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { userService } = require('../services');


// const createCart = catchAsync(async (req, res) => {
//   try {
//     let userBody = req.body  

//     if (data) {
//       res.status(200).send({ message: 'Cart created successfully' });
//     } else {
//       res.status(404).send({ message: 'Cart not created' });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send({ message: 'Internal server error' });
//   }
// });

// Execute createCart after a delay using setTimeout
// setTimeout((req,res) => {
//   createCart(req, res);
// }, 1000); 




const getCart = catchAsync(async (req, res) => {
  const query ={};
  query.status = req.query.status?req.query.status:true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await cartService.getCart(query,options);
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

const clearCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCartById(req.user.dataValues.id);
  console.log("cartt==============================",cart);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart not found');
  }
  const cartUpdate = await cartService.clearCartByUserId(req.user.dataValues.id);
  if (cartUpdate) {
    res.status(httpStatus.OK).send({ message: 'Cart Cleared Successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in Clearing Cart' });
  }
});
module.exports = {
  // createCart,
  deleteCart,
  getCart,
  updateCart,
  getCartById,
  clearCart
};
