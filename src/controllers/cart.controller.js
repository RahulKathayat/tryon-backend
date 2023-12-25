const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { paymentService, couponService } = require('../services');

const getCart = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await cartService.getCart(query, options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'cart data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getCartMe = catchAsync(async (req, res) => {
  const data = await cartService.getCartById(req.user.id);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'cart data by id is fetched successfully', data: data });
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
    const userId = req.user.id;
    const newData = req.body;
    console.log('newdata-------------------------------------------------', newData.discountId);
    const data = await couponService.getCouponById(newData.discountId);
    const discountCoupon = data?.dataValues?.discount;
    const updatedUser = await cartService.updateCartById(userId, newData, discountCoupon);
    // const orderAddressId = await orderService.orderAddressId(userId, newData.addressId);
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

// For Checkout

// async function createCheckout(req, res) {
//   try {
//     const userId = req.user.id;

//     const { order, orderDetailsArray, totalAmount } = await cartService.createCheckout(userId);
//     console.log("order controller check function ==============================", order, orderDetailsArray, totalAmount);
//     if (!order) {
//       return res.status(httpStatus.OK).send({ message: 'No items in your cart!' });
//     }
//     const amountForPayment = await paymentService.createOrderForPayment(totalAmount); // calling razorpay create order
//     const razorpayPaymentDetails = {
//       created_at: amountForPayment.created_at,
//       id: amountForPayment.id,
//       receipt: amountForPayment.receipt,
//       status: amountForPayment.status
//     };

//     res.json({ order, orderDetails: orderDetailsArray, totalAmount, razorpayPaymentDetails });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

async function createCheckout(req, res) {
  try {
    const userId = req.user.id;

    const checkoutResponse = await cartService.createCheckout(userId);

    if (!checkoutResponse || !checkoutResponse.order) {
      return res.status(httpStatus.OK).send({ message: 'No items in your cart!' });
    }

    const { order, orderDetailsArray, totalAmount } = checkoutResponse;

    const amountForPayment = await paymentService.createOrderForPayment(totalAmount);

    const razorpayPaymentDetails = amountForPayment
      ? {
          created_at: amountForPayment.created_at,
          id: amountForPayment.id,
          receipt: amountForPayment.receipt,
          status: amountForPayment.status
        }
      : {};

    //clear cart on checkout
    const cartUpdate = await cartService.clearCartByUserId(req.user.dataValues.id);

    res.json({ order, orderDetails: orderDetailsArray, totalAmount, razorpayPaymentDetails, cartUpdate });
  } catch (error) {
    console.log('ero------------------', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  deleteCart,
  getCart,
  updateCart,
  getCartById,
  getCartMe,
  clearCart,
  createCheckout
};
