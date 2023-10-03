const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {cartController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { cartValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router.delete('/clearCart',auth(),validate(cartValidation.clearCart), cartController.clearCart)

router
.route('/')
.get(auth(),cartController.getCart)
// .post(auth(),validate(cartValidation.createCart),cartController.createCart)


router
.route('/:id')
.put(auth(),validate(cartValidation.updateCart),cartController.updateCart)
.delete(auth(),cartController.deleteCart)
.get(auth(),cartController.getCartById)



module.exports = router;
