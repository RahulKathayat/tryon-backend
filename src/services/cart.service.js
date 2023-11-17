const { Cart, Users, Orders, OrderDetails } = require('../models');
const { createOrderForPayment } = require('../controllers/payment.controller');
const { json } = require('sequelize');
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
 

async function createCheckout(userId, cartData) {
    try {
      if (!userId) {
        throw new Error('No user ID provided.');
      }
  
      const cart = await Cart.findOne({ where: { userId: userId } });
  
      let cartDetails = cart.dataValues.cartDetail || {};
      // cartDetails = JSON.parse(cartDetails);
      try {
        cartDetails = JSON.parse(cartDetails);
      } catch (error) {
        console.error('Error parsing cartDetails:', error);
      }
      if (Array.isArray(cartDetails.cartDetails)) {
        
        let cartItems = [];
        let finalAmount=0;
        cartDetails.cartDetails.forEach(item => {
       console.log("total amounnt=================",item.selectedQuantity);

          const id = item.id;
          const selectedQuantity = item.selectedQuantity;
          finalAmount = item.finalAmount;
          cartItems.push({ id, finalAmount, selectedQuantity });

        });
        console.log("cartitems=============",cartItems);
    
      //   return cartItems;
      // } else {
      //   console.log('No items in the cart!');
      //   return { order: null, orderDetailsArray: null, totalAmount: null };
      // }
      let Amount = cartItems.reduce((acc, item) => {
        return acc + (item.finalAmount * item.selectedQuantity);
    }, 0);
    
    console.log("Total Amount:",Amount);
    
      const order = await Orders.create(
        {
        userId: userId,
        totalItems: cartItems.length, // Assuming you're using the cartItems array
        totalQuantity: cartItems.reduce((acc, item) => acc + (item.selectedQuantity || 0), 0),
        totalAmount:Amount,
        status: true,
      });
      
     
      const orderDetailsData = cartItems.map((item) => {
      const itemAmount =   ((item.finalAmount*1)*(item.selectedQuantity*1))
        console.log("object",itemAmount);
        let data= {
        orderId: order.id,
        productId: item.id,
        type: 'On Process', 
        amount:item.finalAmount||0,
        totalQuantity: item.selectedQuantity || 0,
        calculatedAmount:itemAmount,
        status: true,

      };

      return data;
    }
      
      );
  
      const orderDetailsArray = await OrderDetails.bulkCreate(orderDetailsData);
  
      const totalAmount = orderDetailsData.reduce((acc, item) => acc + parseFloat(item.calculatedAmount), 0);
  
      await Cart.update(
        {
          totalAmount: totalAmount,
          totalItems: order.totalItems,
          totalQuantity: order.totalQuantity,
        },
        { where: { userId: userId } }
      );
  
  
      return { order, orderDetailsArray, totalAmount };
    } 
  }catch (error) {
      console.error('Error in createCheckout:', error);
      throw error;
    }
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
