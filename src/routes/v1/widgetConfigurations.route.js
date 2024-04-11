const express = require('express');

const widgetConfigurationsController = require('../../controllers/widgetConfiguration');

const router = express.Router();

router.post('/addConfig', widgetConfigurationsController.addWidgetConfigurations);
module.exports = router;