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
router.get('/getLowToHigh', productController.getLowToHighPrice);
router.get('/getHighToLow', productController.getHighToLowPrice);
router;

router.get('/isUpcoming', productController.isUpcomingproduct);
router.get('/me', auth(), productController.getProductsForUser); //for logged-in user

router
  .get('/search', productController.getProductBySearch)
  .route('/')
  .get(productController.getProduct) // for without logged-in user

  .post(auth(), validate(productValidation.createProduct), productController.createProduct);

router.get('/admin', auth(), productController.getProductForAdmin); //admin
router.put('/isActive/:id', auth(), validate(productValidation.updateIsActive), productController.updateIsActive);

router.get('/getProductDetailsBySlug/:slug', auth(), productController.getProductBySlug);

router
  .route('/:id')
  .put(auth(), validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth(), productController.deleteProduct)
  .get(productController.getProductById);

module.exports = router;
