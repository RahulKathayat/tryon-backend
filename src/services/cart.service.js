const { Cart, Users, Orders, OrderDetails } = require('../models');
const { createOrderForPayment } = require('../controllers/payment.controller');

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
    const data = await Cart.findAll({
      where: { userId: id }
    });
    return data;
  } catch (error) {
    console.error('cart not found!!', error);
  }
};

const updateCartById = async (userId, newData) => {
  try {
    const updateQuantity = await Cart.update(newData, { where: { userId: userId } });
    console.log();
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

async function createCheckout(userId) {
  if (!userId) {
    throw new Error('No user ID provided.');
  }

  // Fetch the user's cart
  const cart = await Cart.findOne({ where: { userId: userId } });

  // If there's no cart for the user, throw an error
  if (!cart) {
    throw new Error('Cart not found for this user or unauthorized');
  }

  // Extract cart details and transform them into order details data
  const cartDetails = cart?.cartDetail || {};

  if (Object.keys(cartDetails).length === 0) {
    return { order: null, orderDetailsArray: null, totalAmount: null };
  }

  // Create an order from the cart's data
  const order = await Orders.create({
    userId: cart.userId,
    totalItems: Object.keys(cartDetails).length,
    totalQuantity: Object.values(cartDetails).reduce((acc, item) => acc + item.quantity, 0),
    status: true
  });

  const orderDetailsData = Object.values(cartDetails).map((detail) => {
    return {
      orderId: order.id,
      productId: detail.productId,
      type: detail.type || 'On Process',
      amount: detail.price * detail.quantity,
      totalQuantity: detail.quantity,
      status: true
    };
  });

  const orderDetailsArray = await OrderDetails.bulkCreate(orderDetailsData);

  // Compute total amount for the order
  const totalAmount = orderDetailsData.reduce((acc, detail) => acc + parseFloat(detail.amount), 0);

  // Update the Cart model with new values
  await Cart.update(
    {
      totalAmount: totalAmount,
      totalItems: order.totalItems,
      totalQuantity: order.totalQuantity
    },
    { where: { userId: userId } }
  );

  // Return the order, order details, and total amount
  return { order, orderDetailsArray, totalAmount };
}

module.exports = {
  createCart,
  getCart,
  updateCartById,
  deleteCartById,
  getCartById,
  clearCartByUserId,
  createCheckout
};
