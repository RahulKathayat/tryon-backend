const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoryController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { categoryValidation } = require('../../validations');
const { commonService } = require('../../services');
const upload = require('../../utils/upload');

const router = express.Router();


router.get('/admin',auth(),categoryController.getCategoryForAdmin)  //for admin

router.post('/image', upload.single('image'), categoryController.uploadImage);
router
  .route('/')
  .get(categoryController.getCategory)    //for user
  .post(auth(), validate(categoryValidation.createCategory), categoryController.createCategory);

router.get('/getAll', categoryController.getAll);
router.get('/getAllCategory', categoryController.getAllCategory);

router
  .route('/:id')
  .put(auth(), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth(), categoryController.deleteCategory)
  .get(auth(), categoryController.getCategoryById);

module.exports = router;
