const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {paymentController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { paymentValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),paymentController.getPayment)
.post(auth(),validate(paymentValidation.createPayment),paymentController.createPayment)


router
.route('/:id')
.put(auth(),validate(paymentValidation.updatePayment),paymentController.updatePayment)
.delete(auth(),paymentController.deletePayment)
.get(auth(),paymentController.getPaymentById)




module.exports = router;
