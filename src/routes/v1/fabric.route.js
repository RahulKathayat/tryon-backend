const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {fabricController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { fabricValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');
const upload = require('../../utils/upload');


const router = express.Router();

router.get('/admin',auth(),fabricController.getFabricForAdmin)   //for admin

router.post('/image', upload.single('image'), fabricController.uploadImage);

router
.route('/')
.get(fabricController.getFabric)  // for users
.post(auth(),validate(fabricValidation.createFabric),fabricController.createFabric)


router
.route('/:id')
.put(auth(),validate(fabricValidation.updateFabric),fabricController.updateFabric)
.delete(auth(),fabricController.deleteFabric)
.get(auth(),fabricController.getFabricById)




module.exports = router;
