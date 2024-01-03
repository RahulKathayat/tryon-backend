const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { contactController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { contactValidation } = require('../../validations');
const { commonService } = require('../../services');
const router = express.Router();

router.get('/', auth(), contactController.getAllContact);
router.post('/', validate(contactValidation.createContact), contactController.createContact);

module.exports = router;
