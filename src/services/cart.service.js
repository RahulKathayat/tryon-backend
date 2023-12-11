const { Cart, Users, Orders, OrderDetails, paymentLog } = require('../models');
const { createOrderForPayment } = require('../controllers/payment.controller');
const { json } = require('sequelize');
const shipRocketService = require('../services/shipRocket.service');
const paymentService = require('../services/paymentLog.service');
// const { cartService } = require('../services/cart.service');

const createCart = async (_userBody) => {
  const userBody = _userBody;
  const existingCart = await Cart.findOne({
    where: { userId: userBody }
  });
  if (!existingCart) {
    const data = await Users.findOne({
      where: {
        id: userBody,
        role: 'Customer'
      }
    });
    if (data) {
      return Cart.create({ userId: userBody, cartDetail: {} });
    } else {
      return 'user role does not matched';
    }
  }
};

const getCart = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Cart.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: Users }],
    limit,
    offset
  });
  return support;
};

const getCartById = async (id) => {
  try {
    // console.log('is===============', id);
    const data = await Cart.findOne({
      where: { userId: id, isActive: true, status: true }
    });
    return data;
  } catch (error) {
    console.error('cart not found!!', error);
  }
};

const updateCartById = async (userId, newData) => {
  try {
    const updateQuantity = await Cart.update(newData, { where: { userId: userId } });
    return updateQuantity;
  } catch (err) {
    console.log('err=====================', err);
  }
};

const deleteCartById = async (Id) => {
  try {
    const data = await Cart.findOne({ where: Id });

    if (!data) {
      throw new Error('Cart not found');
    }
    data.status = 0;
    await data.save();

    console.log('Cart deleted successfully');

    return { message: 'Cart deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const clearCartByUserId = async (userId) => {
  return Cart.update(
    { cartDetail: null, totalAmount: 0, totalItems: 0, totalQuantity: 0, discountCode: null },
    {
      where: { userId, status: true }
    }
  );
};

async function createCheckout(userId, cartData) {
  try {
    if (!userId) {
      throw new Error('No user ID provided.');
    }
    const userData = await Users.findOne({ where: { id: userId } });
    // console.log('------------------------------------', addressId, 'userId0------------------------', userId);
    const cart = await Cart.findOne({ where: { userId: userId } });

    let cartDetails = cart.dataValues.cartDetail || {};
    // cartDetails = JSON.parse(cartDetails);
    const addressId = cart.dataValues.addressId;
    try {
      cartDetails = JSON.parse(cartDetails);
      console.log(addressId);
    } catch (error) {
      console.error('Error parsing cartDetails:', error);
    }
    if (Array.isArray(cartDetails.cartDetails)) {
      let cartItems = [];
      let finalAmount = 0;
      cartDetails.cartDetails.forEach((item) => {
        const id = item.id;
        const selectedQuantity = item.selectedQuantity;
        finalAmount = item.finalAmount;
        cartItems.push({ id, finalAmount, selectedQuantity });
      });

      //   return cartItems;
      // } else {
      //   console.log('No items in the cart!');
      //   return { order: null, orderDetailsArray: null, totalAmount: null };
      // }
      let Amount = cartItems.reduce((acc, item) => {
        return acc + item.finalAmount * item.selectedQuantity;
      }, 0);

      console.log('Total Amount:', Amount);
      console.log('addressId-----------------------', addressId);
      const order = await Orders.create({
        userId: userId,
        totalItems: cartItems.length,
        totalQuantity: cartItems.reduce((acc, item) => acc + (item.selectedQuantity || 0), 0),
        totalAmount: Amount,
        orderDetails: cartDetails.cartDetails,
        status: true,
        addressId: addressId
      });
      console.log('-----------------------', order);
      const orderDetailsData = cartItems.map((item) => {
        const itemAmount = item.finalAmount * 1 * (item.selectedQuantity * 1);
        console.log('object', itemAmount);
        let data = {
          orderId: order.id,
          productId: item.id,
          type: 'In Process',
          amount: item.finalAmount || 0,
          totalQuantity: item.selectedQuantity || 0,
          calculatedAmount: itemAmount,
          status: true
        };
        return data;
      });

      const orderDetailsArray = await OrderDetails.bulkCreate(orderDetailsData);

      const totalAmount = orderDetailsData.reduce((acc, item) => acc + parseFloat(item.calculatedAmount), 0);

      const data = await Cart.update(
        {
          totalAmount: totalAmount,
          totalItems: order.totalItems,
          totalQuantity: order.totalQuantity,
          addressId: addressId
        },
        { where: { userId: userId } }
      );
      return { order, orderDetailsArray, totalAmount };
    }
  } catch (error) {
    console.error('Error in createCheckout:', error);
    throw error;
  }
}

/* order will create according to the payment status, if paymentLog.isActive=true then order will create
successfully else it will create a draft order with status=0. */
// async function createCheckout(userId, cartData) {
//     try {
//       if (!userId) {
//         throw new Error('No user ID provided.');
//       }
//       const cart = await Cart.findOne({ where: { userId: userId } });
//       let cartDetails = cart.dataValues.cartDetail || {};
//       try {
//         cartDetails = JSON.parse(cartDetails);
//       } catch (error) {
//         console.error('Error parsing cartDetails:', error);
//       }
//       if (Array.isArray(cartDetails.cartDetails)) {
//         let cartItems = [];
//         let finalAmount = 0;
//         cartDetails.cartDetails.forEach((item) => {
//           const id = item.id;
//           const selectedQuantity = item.selectedQuantity;
//           finalAmount = item.finalAmount;
//           cartItems.push({ id, finalAmount, selectedQuantity });
//         });
//         let Amount = cartItems.reduce((acc, item) => {
//           return acc + item.finalAmount * item.selectedQuantity;
//         }, 0);
//         console.log('Total Amount:', Amount);
//         // Create a draft order
//         const draftOrder = await Orders.create({
//           userId: userId,
//           totalItems: cartItems.length,
//           totalQuantity: cartItems.reduce((acc, item) => acc + (item.selectedQuantity || 0), 0),
//           totalAmount: Amount,
//           orderDetails: cartDetails.cartDetails,
//           status: false // Draft status
//         });
//         // Create draft order details
//         const orderDetailsData = cartItems.map((item) => {
//           const itemAmount = item.finalAmount * 1 * (item.selectedQuantity * 1);
//           return {
//             orderId: draftOrder.id,
//             productId: item.id,
//             type: "Draft",
//             amount: item.finalAmount || 0,
//             totalQuantity: item.selectedQuantity || 0,
//             calculatedAmount: itemAmount,
//             status: false // Draft status
//           };
//         });
//         const orderDetailsArray = await OrderDetails.bulkCreate(orderDetailsData);
//         const isPaymentSuccessful = await paymentService.checkPaymentStatus(userId, draftOrder.id);
//         if (isPaymentSuccessful) {
//           await Orders.update({ status: true }, { where: { id: draftOrder.id } });
//           await OrderDetails.update({ status: true, type:'On Process' }, { where: { orderId: draftOrder.id } });
//         }

//         await Cart.update(
//           {
//             totalAmount: Amount,
//             totalItems: draftOrder.totalItems,
//             totalQuantity: draftOrder.totalQuantity
//           },
//           { where: { userId: userId } }
//         );
//         return { order: draftOrder, orderDetailsArray, totalAmount: Amount };
//       }
//     } catch (error) {
//       console.error('Error in createCheckout:', error);
//       throw error;
//     }
//   }

module.exports = {
  createCart,
  getCart,
  updateCartById,
  deleteCartById,
  getCartById,
  clearCartByUserId,
  createCheckout
};
