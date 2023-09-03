const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const addProductController = require('../../controllers/addproduct.controller');
const authValidation = require('../../validations/auth.validation');
const { addProductValidation } = require('../../validations');
const { commonService } = require('../../services');
const router = express.Router();
router
  .route('/')
  .get(auth(),addProductController.getAddProduct)
  .post(auth(),validate(addProductValidation.createAddProduct), addProductController.createAddProduct);
router
  .route('/:id')
  .put(auth(),validate(addProductValidation.updateAddProduct), addProductController.updateAddProduct)
  .delete(auth(),addProductController.deleteAddProduct)
  .get(auth(),addProductController.getAddProductById);
module.exports = router;