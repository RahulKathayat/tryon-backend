const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { ratingsController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { ratingsValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();

// user routes
router.post('/me', auth(), validate(ratingsValidation.createRatings), ratingsController.createRatings);
router.get('/me', auth(), ratingsController.getUserRatings);
router.put('/me/:id', auth(), validate(ratingsValidation.updateRatings), ratingsController.updateRatings);
router.delete('/me/:id', auth(), ratingsController.deleteUserRatings);
router.get('/calculate', ratingsController.averageRating);

// admin routes
router.route('/').get(ratingsController.getRatings); //admin

router.route('/:id').delete(auth(), ratingsController.deleteRatings).get(auth(), ratingsController.getRatingsById);

module.exports = router;
