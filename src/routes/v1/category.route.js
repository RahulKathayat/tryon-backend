const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {categoryController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { categoryValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(auth(),categoryController.getCategory)
.post(auth(),validate(categoryValidation.createCategory),categoryController.createCategory)

router.get('/getAll',auth(),categoryController.getAllCategory)

router
.route('/:id')
.put(auth(),validate(categoryValidation.updateCategory),categoryController.updateCategory)
.delete(auth(),categoryController.deleteCategory)
.get(auth(),categoryController.getCategoryById)






module.exports = router;
