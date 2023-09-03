const express = require('express');
const auth = require('../../middlewares/auth');
const { commonController } = require('../../controllers');

const router = express.Router();

router.post('/Settings',auth(),  commonController.saveUserSettings);
router.get('/Settings', auth(), commonController.getUserSettings);
router.get('/:name',auth(),commonController.getAll);



module.exports = router;
