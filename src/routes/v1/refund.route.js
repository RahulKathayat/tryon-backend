const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {refundController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { refundValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),refundController.getRefund)
.post(auth(),validate(refundValidation.createRefund),refundController.createRefund)


router
.route('/:id')
.put(auth(),validate(refundValidation.updateRefund),refundController.updateRefund)
.delete(auth(),refundController.deleteRefund)
.get(auth(),refundController.getRefundById)




module.exports = router;
