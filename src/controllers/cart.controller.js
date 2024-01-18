const catchAsync = require('../utils/catchAsync');
const cartService = require('../services/cart.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { paymentService, couponService, productService } = require('../services');
const ApiError = require('../utils/ApiError');

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
  // const discountCoupon = getDiscountAmt?.dataValues?.discount;
  let getDiscountAmt;
  if (data.cartDetail != null) {
    getDiscountAmt = await couponService.getCouponById(data.cartDetail.discountId);
  }
  if (data) {
    // data.dataValues.cartDetail = JSON.parse(data.dataValues.cartDetail);
    res
      .status(httpStatus.OK)
      .send({ message: 'cart data by id is fetched successfully', data: data, discountAmount: getDiscountAmt });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    const newData = req.body;
    const id = newData.cartDetail.discountId;
    console.log('id=========================', id);
    console.log('check new body ----------------------------------', newData);
    let data;
    if (id) {
      data = await couponService.getCouponById(id);
      if (data == false) {
        res.status(400).send({ message: 'coupon code expired' });
        return;
      }
    }

    let discountCoupon;
    let couponCode;
    if (data) {
      discountCoupon = data?.dataValues?.discount;
      couponCode = data.dataValues.couponCode;
    }

    const updatedUser = await cartService.updateCartById(userId, newData, discountCoupon, couponCode);

    if (updatedUser) {
      res.status(200).send({ data: updatedUser, discountPercentage: discountCoupon, message: 'cart updated successfully' });
    } else {
      res.status(404).send({ message: 'cart not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
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
    console.log('check checkout----------------------------------------------', checkoutResponse);
    if (checkoutResponse.data) {
      res.status(400).send({ message: checkoutResponse.data });
      return;
    }

    if (!checkoutResponse || !checkoutResponse.order) {
      return res.status(httpStatus.OK).send({ message: 'No items in your cart!' });
    }

    const { order, orderDetailsArray, totalAmount, _finalAmount } = checkoutResponse;

    const amountForPayment = await paymentService.createOrderForPayment(_finalAmount);

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
  // getCartById,
  getCartMe,
  clearCart,
  createCheckout
};
