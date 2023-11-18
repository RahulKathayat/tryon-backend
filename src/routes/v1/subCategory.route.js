const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { subCategoryController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { subCategoryValidation } = require('../../validations');
const { commonService } = require('../../services');
const { getSubCategoryAndCategory } = require('../../services/subCategory.service');
// const auth = require('../../middlewares/auth');

const upload = require('../../utils/upload');

const router = express.Router();
router.post('/image', upload.single('image'), subCategoryController.uploadImage);
router.get('/admin',auth(),subCategoryController.getSubCategoryForAdmin) //admin

router
  .route('/')
  .get(subCategoryController.getSubCategory)   // users
  .post(auth(), validate(subCategoryValidation.createSubCategory), subCategoryController.createSubCategory);

router.get('/getAll',subCategoryController.getAllSubCategory);
// router.get('/subcateoryAndCategory',auth(),subCategoryController.getSubCategoryAndCategory)
router
  .route('/:id')
  .put(auth(), validate(subCategoryValidation.updateSubCategory), subCategoryController.updateSubCategory)
  .delete(auth(), subCategoryController.deleteSubCategory)
  .get(auth(), subCategoryController.getSubCategoryById),
  (module.exports = router);
