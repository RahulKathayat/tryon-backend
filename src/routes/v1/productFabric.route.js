const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {productFabricController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { productFabricValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),productFabricController.getProductFabric)
.post(auth(),validate(productFabricValidation.createProductFabric),productFabricController.createProductFabric)


router
.route('/:id')
.put(auth(),validate(productFabricValidation.updateProductFabric),productFabricController.updateProductFabric)
.delete(auth(),productFabricController.deleteProductFabric)
.get(auth(),productFabricController.getProductFabricById)




module.exports = router;
