const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { setingController } = require('../../controllers');

const router = express.Router();
router.post('/', setingController.createSetting);
router.put('/:id', setingController.updateSetting);
router.get('/', setingController.getSetting);

router.delete('/:id', setingController.deleteSetting);

module.exports = router;
