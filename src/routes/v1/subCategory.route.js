const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {subCategoryController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { subCategoryValidation } = require('../../validations');
const { commonService } = require('../../services');
const { getSubCategoryAndCategory } = require('../../services/subCategory.service');
// const auth = require('../../middlewares/auth');

const router = express.Router();

router
.route('/')
.get(auth(),subCategoryController.getSubCategory)
.post(auth(),validate(subCategoryValidation.createSubCategory),subCategoryController.createSubCategory)

router.get('/getAll',auth(),subCategoryController.getAllSubCategory)
// router.get('/subcateoryAndCategory',auth(),subCategoryController.getSubCategoryAndCategory)
router
.route('/:id')
.put(auth(),validate(subCategoryValidation.updateSubCategory),subCategoryController.updateSubCategory)
.delete(auth(),subCategoryController.deleteSubCategory)
.get(auth(),subCategoryController.getSubCategoryById),






module.exports = router;
