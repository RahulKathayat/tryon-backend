const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { productValidation } = require('../../validations');
const { commonService } = require('../../services');
const upload = require('../../utils/upload');

// const auth = require('../../middlewares/auth');

const router = express.Router();
router;

router.post('/images', upload.array('image', 15), productController.uploadImages);
router.post('/featureImage', upload.single('image'), productController.uploadFeatureImage);
// router.put('/featureImage/:id', upload.single('image'), productController.uploadFeatureImage);
router.get('/getLowToHigh', productController.getLowToHighPrice);
router.get('/getHighToLow', productController.getHighToLowPrice);
router;

router.get('/isUpcoming', productController.isUpcomingproduct);

router
  .get('/search', productController.getProductBySearch)
  .route('/')
  .get(productController.getProduct)

  .post(auth(), validate(productValidation.createProduct), productController.createProduct);

router
  .route('/:id')
  .put(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), productController.deleteProduct)
  .get(productController.getProductById);

module.exports = router;
