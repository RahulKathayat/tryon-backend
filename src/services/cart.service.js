const { Cart,Users } = require('../models');

const createCart = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await Cart.create(userBody);
   console.log("data",data);
   return data
};

const getCart = async () => {
  try {
    const data = await Cart.findAll({
      where: {status:true},
      include:[{model:Users}]
    });
    return data;
  } catch (error) {
    console.error('cart not found!!', error);
  }
};

const getCartById = async (id) => {
  try {
    const data = await Cart.findAll({
      where: {id:id}
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
}


const deleteCartById = async (Id) => {
    try {
      const user = await Cart.findOne({ where:   Id  });
  
      if (!user) {
        throw new Error('Cart not found');
      }
      await user.update({ status: false });
  
      console.log("Cart deleted successfully");
  
      return { message: 'Cart deleted successfully' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

module.exports = {
    createCart,
    getCart,
    updateCartById,
    deleteCartById,
    getCartById
  
};
