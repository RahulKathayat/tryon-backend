const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { orderDetailsController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { orderDetailsValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router.get('/getOrderDetailsByOrderId/:id', auth(), orderDetailsController.getOrderDetailsByOrderId);
router
  .route('/')
  .get(auth(), orderDetailsController.getOrderDetails)
  .post(auth(), validate(orderDetailsValidation.createOrderDetails), orderDetailsController.createOrderDetails);

router
  .route('/:id')
  .put(auth(), validate(orderDetailsValidation.updateOrderDetails), orderDetailsController.updateOrderDetails)
  .delete(auth(), orderDetailsController.deleteOrderDetails)
  .get(auth(), orderDetailsController.getOrderDetailsById);

// Routes for Users
// router.get('/me', auth(), orderDetailsController.getOrderDetailsForUser);

// For orders
router.post('/cancel/:orderDetailId', auth(),orderDetailsController.cancelOrder)

module.exports = router;
