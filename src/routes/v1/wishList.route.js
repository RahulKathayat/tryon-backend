const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const wishlistController = require('../../controllers/wishList.controller');
const authValidation = require('../../validations/auth.validation');
const { wishlistValidation } = require('../../validations');
const { commonService } = require('../../services');
const router = express.Router();

router.get('/me', auth(), wishlistController.getWishlistByUserId);
router.delete('/me/:productId', auth(), wishlistController.deleteWishlist);
router
  .route('/')
  .get(auth(), wishlistController.getWishlist)
  .post(auth(), validate(wishlistValidation.createWishlist), wishlistController.createWishlist);
router
  .route('/:id')
  .put(auth(), validate(wishlistValidation.updateWishlist), wishlistController.updateWishlist)
  .delete(auth(), wishlistController.deleteWishlist);

module.exports = router;
