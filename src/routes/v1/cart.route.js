const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { cartController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { cartValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router.delete('/clearCart', auth(), validate(cartValidation.clearCart), cartController.clearCart);
router.put('/me', auth(), validate(cartValidation.updateCart), cartController.updateCart);
router.get('/me', auth(), cartController.getCartMe);

router.route('/').get(auth(), cartController.getCart);

router
  .route('/:id')
  // .put(validate(cartValidation.updateCart), cartController.updateCart)
  .delete(cartController.deleteCart)
  .get(cartController.getCartById);

module.exports = router;
