const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { userController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { userValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
  .route('/')
  .get(auth(), userController.getUser)
  .post(auth(), validate(userValidation.createUser), userController.createUser);

router.get('/email', userController.getUserByEmail);
router.get('/me', auth(), userController.getUserDataByUserId);

router
  .route('/:id')
  .put(validate(auth(), userValidation.updateUser), userController.updateUser)
  .delete(auth(), userController.deleteUser)
  .get(auth(), userController.getUserById);

module.exports = router;
