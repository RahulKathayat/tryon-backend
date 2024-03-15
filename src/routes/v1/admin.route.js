const express = require('express');


const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.adminRegister);
router.post('/login', validate(authValidation.login), authController.adminLogin);
module.exports = router;