const catchAsync = require('../utils/catchAsync');
const wishlistService = require('../services/wishList.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');

const createWishlist = catchAsync(async (req, res) => {
  let userBody = req.body;
  const data = await wishlistService.createWishlist(userBody);
  if (data) {
    await res.status(200).send({ message: 'Wishlist created successfully' });
  } else {
    await res.status(404).send({ message: 'Wishlist not created' });
  }
});

const getWishlist = catchAsync(async (req, res) => {
  const query = {};
  query.status = req.query.status ? req.query.status : true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const data = await wishlistService.getWishlist(query, options);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Wishlist data fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const getWishlistByUserId = catchAsync(async (req, res) => {
  // let query = {};
  // query.status = req.query.status ? req.query.status : true;
  const id = req.user.id;
  const data = await wishlistService.getWishlistByUserId(id);
  console.log('userId================================', data);
  if (data) {
    res.status(httpStatus.OK).send({ message: 'Wishlist data by id is fetched successfully', data: data });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
  }
  return data;
});

const updateWishlist = catchAsync(async (req, res) => {
  try {
    const userId = req.params;
    const newData = req.body;
    const updatedUser = await wishlistService.updateWishlistById(userId, newData);
    if (updatedUser) {
      res.status(200).send({ data: updatedUser, message: 'Wishlist updated successfully' });
    } else {
      res.status(404).send({ message: 'Wishlist not found', status: 0 });
    }
  } catch (error) {
    console.error('Error updating Wishlist:', error);
    res.status(500).send({ message: 'Internal server error', status: -1 });
  }
});

const deleteWishlist = catchAsync(async (req, res) => {
  const querry = req.user.id;
  const params = req.params.productId;

  console.log('ids..........................', querry, params);

  const deleteUser = await wishlistService.deleteWishlistById(querry, params);
  if (deleteUser) {
    res.status(httpStatus.OK).send({ message: 'Wishlist deleted successfully' });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'Error in Wishlist delete' });
  }
});

const isWishlisted = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const productIds = await wishlistService.isWishlisted(userId);

  if (productIds && productIds.length > 0) {
    res.status(httpStatus.OK).send({
      message: 'Wishlist product IDs fetched successfully',
      data: productIds
    });
  } else {
    res.status(httpStatus.NO_CONTENT).send({ message: 'No products in wishlist or error in fetching data' });
  }
});

module.exports = {
  createWishlist,
  deleteWishlist,
  getWishlist,
  updateWishlist,
  getWishlistByUserId,
  isWishlisted
};
