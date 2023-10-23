const { Cart, Users } = require('../models');

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
      return Cart.create({ userId: userBody });
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
  console.log('cart id==================================', id);
  try {
    const data = await Cart.findAll({
      where: { userId: id }
    });
    return data;
  } catch (error) {
    console.error('cart not found!!', error);
  }
};

// const updateCartById = async (id, newData) => {
//   try {
//     console.log('id');
//     const findData = await Cart.findOne({
//       where: id
//     });
//     if (findData) {
//       return await Cart.update(newData, { where: id });
//     } else {
//       return;
//     }
//   } catch (err) {
//     console.log('err=====================', err);
//   }
// };

const updateCartById = async (userId, newData) => {
  try {
    let storeData = [];
    for (var itemKey in newData.cartDetail) {
      var item = newData.cartDetail[itemKey];
      storeData.push(item);
      // productId = item.productId;
      // var quantity = item.quantity;
      // var price = item.price;
    }
    const existingCart = await Cart.findOne({ where: userId });
    console.log('storeData :', storeData);

    const existingProductId1 = existingCart.dataValues.cartDetail.item1.productId;
    const existingProductId2 = existingCart.dataValues.cartDetail.item2.productId;
    console.log('existingProductId1 :', existingProductId1);
    console.log('existingProductId2 :', existingProductId2);
    if (existingProductId1 === storeData[0].productId && existingProductId2 === storeData[1].productId) {
      console.log('jsonparse=====================================', newData);
      return 'this product is already exist';
      const updateQuantity = await Cart.update(newData, { where: userId });
      console.log();
      return updateQuantity;
    }
    // if (existingCart.dataValues.cartDetail) {
    //   let cartDetail = existingCart.cartDetail;
    //   let updateQuantit = {};
    //   if (cartDetail.item1.productId) {
    //     let quantity = 1;

    //     quantity += cartDetail.item1.quantity;
    //     updateQuantit = {
    //       quantity: quantity
    //     };
    //   } else {
    //     cartDetail = {
    //       productId: cartDetail.item1.productId,
    //       quantity: quantity
    //       // price,
    //     };
    //     const createCart = await Cart.create(cartDetail);

    //     return createCart;
    //   }
    // }
  } catch (err) {
    console.log('err=====================', err);
  }
};

const deleteCartById = async (Id) => {
  try {
    const user = await Cart.findOne({ where: Id });

    if (!user) {
      throw new Error('Cart not found');
    }
    await user.update({ status: false });

    console.log('Cart deleted successfully');

    return { message: 'Cart deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const clearCartByUserId = async (userId) => {
  console.log('userID&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', userId);
  return Cart.update(
    { cartDetail: null, totalAmount: 0, totalItems: 0, totalQuantity: 0, discountCode: null },
    {
      where: { userId, status: true }
    }
  );
};

module.exports = {
  createCart,
  getCart,
  updateCartById,
  deleteCartById,
  getCartById,
  clearCartByUserId
};
