const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { couponController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { couponValidation } = require('../../validations');

const router = express.Router();
router.post('/', couponController.createCoupon);
router.put('/:id', couponController.updateCoupon);
router.get('/', couponController.getCoupon);
router.get('/', couponController.getCoupon);

router.delete('/', couponController.deleteCoupon).get(couponController.getCouponById);

module.exports = router;
