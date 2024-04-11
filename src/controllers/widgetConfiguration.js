const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { WidgetConfiguration,Subscription } = require('../models');
const ApiError = require('../utils/ApiError');

const addWidgetConfigurations = catchAsync(async (req, res) => {
    try{
        console.log(req.body);
        const config={settings:JSON.stringify(req.body),status:true};
        await WidgetConfiguration.create(config);
        res.status(httpStatus.OK).send({ message: 'Widget Configuration added Successfully' });
    }
    catch(err){
        console.log(err);
        res.send({ message: 'Problem in adding Widget Configurations' });
    }
});

module.exports = {
    addWidgetConfigurations
};