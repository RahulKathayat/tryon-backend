const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {ratingsController } = require('../../controllers');
const authValidation = require('../../validations/auth.validation');
const { ratingsValidation } = require('../../validations');
const { commonService } = require('../../services');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router
.route('/')
.get(ratingsController.getRatings)
.post(validate(ratingsValidation.createRatings),ratingsController.createRatings)


router
.route('/:id')
.put(auth(),validate(ratingsValidation.updateRatings),ratingsController.updateRatings)
.delete(auth(),ratingsController.deleteRatings)
.get(auth(),ratingsController.getRatingsById)




module.exports = router;
