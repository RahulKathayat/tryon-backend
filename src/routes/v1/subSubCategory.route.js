const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const subSubCategoryController = require('../../controllers/subSubCategory.controller');
const authValidation = require('../../validations/auth.validation');
const { subSubCategoryValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),subSubCategoryController.getSubSubCategory)
.post(auth(),validate(subSubCategoryValidation.createSubSubCategory),subSubCategoryController.createSubSubCategory)

router.get('/allCategories',auth(),subSubCategoryController.getAllCategories)


router
.route('/:id')
.put(auth(),validate(subSubCategoryValidation.updateSubSubCategory),subSubCategoryController.updateSubSubCategory)
.delete(auth(),subSubCategoryController.deleteSubSubCategory)
.get(auth(),subSubCategoryController.getSubSubCategoryById)




module.exports = router;
