const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.get('/generate-password', validate(authValidation.generatePassword), authController.generatePassword);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
