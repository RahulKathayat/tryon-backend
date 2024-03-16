const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Subscription } = require('../models');
const ApiError = require('../utils/ApiError');

const adminAddSubscription = catchAsync(async (req, res) => {
    try{
        Subscription.create(req.body);
        res.status(httpStatus.OK).send({ message: 'Tested Successfully' });
    }
    catch(err){
        console.log(err);
        res.send({ message: 'Problem in adding subcription' });
    }
});

module.exports = {
    adminAddSubscription,
};