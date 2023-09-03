const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {productDetailController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { productDetailValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),productDetailController.getProductDetail)
.post(auth(),validate(productDetailValidation.createProductDetail),productDetailController.createProductDetail)


router
.route('/:id')
.put(auth(),validate(productDetailValidation.updateProductDetail),productDetailController.updateProductDetail)
.delete(auth(),productDetailController.deleteProductDetail)
.get(auth(),productDetailController.getProductDetailById)




module.exports = router;
