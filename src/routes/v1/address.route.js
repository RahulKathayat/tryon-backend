const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const addressController  = require('../../controllers/address.controller');
const authValidation = require('../../validations/auth.validation');
const { addressValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),addressController.getAddress)
.post(auth(),validate(addressValidation.createAddress),addressController.createAddress)


router
.route('/:id')
.put(auth(),validate(addressValidation.updateAddress),addressController.updateAddress)
.delete(auth(),addressController.deleteAddress)
.get(auth(),addressController.getAddressById)




module.exports = router;
