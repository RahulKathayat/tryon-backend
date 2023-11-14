const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { paymentController } = require('../../controllers');



const router = express.Router();
router
//Razor pay Api's
router.post('/createOrder', paymentController.createOrderForPayment);
router.post('/initiatePayment', paymentController.initiatePayment);
router.post('/createCustomer', paymentController.createCustomer);
router.post('/verification', paymentController.verify); //for webhook
// router.post('/createCustomer', paymentController.createCustomer);
// router.post('/verifyPayment', paymentController.verifyPayment);


module.exports = router;
