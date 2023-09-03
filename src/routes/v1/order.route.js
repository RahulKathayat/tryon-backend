const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {orderController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { orderValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),orderController.getOrder)
.post(auth(),validate(orderValidation.createOrder),orderController.createOrder)


router
.route('/:id')
.put(auth(),validate(orderValidation.updateOrder),orderController.updateOrder)
.delete(auth(),orderController.deleteOrder)
.get(auth(),orderController.getOrderById)




module.exports = router;
