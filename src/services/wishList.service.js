const { WishList, Product, Users, Sequelize } = require('../models');

const createWishlist = async (_userBody, userId) => {
  let userBody = _userBody;

  try {
    const existingWishlistItem = await WishList.findOne({ where: { productId: userBody.productId, userId, status: 1 } });

    if (existingWishlistItem) {
      return 'Product is already in the wishlist';
    } else {
      userBody = {
        ...userBody,
        userId: userId
      };
      const data = await WishList.create(userBody);
      return 'Wishlist created successfully!!';
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getWishlist = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await WishList.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: Product }, { model: Users }],
    limit,
    offset
  });
  return support;
};

const getWishlistByUserId = async (userId) => {
  try {
    const data = await WishList.findAll({
      where: { userId: userId, status: true, isActive:true },
      include: [{ model: Product }, { model: Users }]
      // attributes: [[Sequelize.literal('true'), 'isWishlisted'], 'id']
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
};

const deleteWishlistById = async (userId, productId) => {
  try {
    const data = await WishList.findOne({
      where: { userId, productId, status: 1 }
    });

    if (!data) {
      throw new Error('Wishlist not found');
    }
    data.status = 0;
    await data.save();

    console.log('Wishlist deleted successfully');

    return { message: 'Wishlist deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const isWishlisted = async (userId) => {
  try {
    const data = await WishList.findAll({
      where: { userId: userId, status: 1 },
      attributes: ['productId']
    });
    const productIds = data.map((item) => item.productId);
    return productIds;
  } catch (error) {
    console.error('Error fetching wishlist items!', error);
    throw error;
  }
};

module.exports = {
  createWishlist,
  getWishlist,
  updateWishlistById,
  deleteWishlistById,
  getWishlistByUserId,
  isWishlisted
};
