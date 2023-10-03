const { Cart, Users } = require('../models');


const createCart = async (_userBody) => {
  const userBody = _userBody;
  const existingCart = await Cart.findOne({
    where: { userId: userBody}
  });
  if (!existingCart) {
    const data= await Users.findOne({
      where:{
       id:userBody, role:"Customer"
      }
     })
     if(data){
      return Cart.create({ userId: userBody });
     }
     else{
      return "user role does not matched"
     }  
  }
}

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
  console.log("cart id==================================",id);
  try {
    const data = await Cart.findAll({
      where: { id: id }
    });
    return data;
  } catch (error) {
    console.error('cart not found!!', error);
  }
};

const updateCartById = async (id, newData) => {
  const findData = await Cart.findOne({
    where: id
  });
  if (findData) {
    return Cart.update(newData, { where: id });
  } else {
    return;
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
  console.log("userID&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",userId)
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
