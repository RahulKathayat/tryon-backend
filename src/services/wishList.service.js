const { WishList } = require('../models');

const createWishlist = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await WishList.create(userBody);
   console.log("data",data);
   return data
};

const getWishlist = async () => {
  try {
    const data = await WishList.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('WishList not found!!', error);
  }
};

const getWishlistById = async (id) => {
  try {
    const data = await WishList.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('WishList not found!!', error);
  }
};

const updateWishlistById = async (id, newData) => {
  const findData = await WishList.findOne({
    where: id
  });
  if (findData) {
    return WishList.update(newData, { where: id });
  } else {
    return;
  }
}


const deleteWishlistById = async (Id) => {
  try {
    const user = await WishList.findOne({ where:   Id  });

    if (!user) {
      throw new Error('Wishlist not found');
    }
    await user.update({ status: false });

    console.log("Wishlist deleted successfully");

    return { message: 'Wishlist deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
    createWishlist,
    getWishlist,
    updateWishlistById,
    deleteWishlistById,
    getWishlistById
  
};
