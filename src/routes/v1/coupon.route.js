const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { couponController } = require('../../controllers');
const { couponValidation } = require('../../validations');

const router = express.Router();
router.post('/', couponController.createCoupon);
router.put('/:id', validate(couponValidation.updateCoupon), couponController.updateCoupon);
router.get('/', couponController.getCoupon);

router.delete('/', couponController.deleteCoupon).get(couponController.getCouponById);

module.exports = router;
