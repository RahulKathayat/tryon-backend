const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const paymentLogController = require('../../controllers/paymentLog.controller');
const { paymentLogValidation } = require('../../validations');
const router = express.Router();

router.get('/me',auth(),paymentLogController.getPaymentLog)
router.post('/me',auth(),validate(paymentLogValidation.createPaymentLog), paymentLogController.createPaymentLog);

 module.exports = router;