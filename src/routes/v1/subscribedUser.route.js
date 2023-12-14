const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subscribedUserController = require('../../controllers/subscribedUser.controller');
const authValidation = require('../../validations/auth.validation');
const { subscribedUserValidation } = require('../../validations');
const { commonService } = require('../../services');
const router = express.Router();
router
  .route('/')
  .get(auth(), subscribedUserController.getSubscribedUser)
  .post(validate(subscribedUserValidation.createSubscribedUser), subscribedUserController.createSubscribedUser);
router
  .route('/:id')
  .delete(auth(), subscribedUserController.deleteSubscribedUser)
  .put(auth(), validate(subscribedUserValidation.updateSubscribedUser), subscribedUserController.updateSubscribedUser);
module.exports = router;
