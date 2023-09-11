const catchAsync = require('../utils/catchAsync');
const orderDetailsService = require('../services/orderDetails.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const { Op } = require('sequelize');



const createOrderDetails = catchAsync(async (req, res) => {
    let userBody = req.body;
    const data = await orderDetailsService.createOrderDetails(userBody);
    if (data) {
        await res.status(200).send({ message: 'order detail created successfully' });
    } else {
        await res.status(404).send({ message: 'order detail not created' });
    }
});



const getOrderDetails = catchAsync(async (req, res) => {
    const query ={};
    query.status = req.query.status?req.query.status:true;
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const { type,amount,trackingId,trackingLink,emailVerify,addressId,dob } = req.query;
    type ? query.type = { [Op.like]: `%${type}%` } : null;
    amount ? query.amount = { [Op.like]: `%${amount}%` } : null;
    trackingId ? query.trackingId = { [Op.like]: `%${trackingId}%` } : null;
    trackingLink ? query.trackingLink = { [Op.like]: `%${trackingLink}%` } : null;

    const data = await orderDetailsService.getOrderDetails(query,options);
    if (data) {
        res.status(httpStatus.OK).send({ message: 'order data fetched successfully', data: data });
    } else {
        res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
    }
    return data;
});

const getOrderDetailsById = catchAsync(async (req, res) => {
    const data = await orderDetailsService.getOrderDetailsById(req.params.id);
    if (data) {
        res.status(httpStatus.OK).send({ message: 'order data by id is fetched successfully', data: data });
    } else {
        res.status(httpStatus.NO_CONTENT).send({ message: 'Error in fetch data' });
    }
    return data;
});



const updateOrderDetails = catchAsync(async (req, res) => {
    try {
        const userId = req.params;
        const newData = req.body;
        const updatedUser = await orderDetailsService.updateOrderDetailsById(userId, newData);
        if (updatedUser) {
            res.status(200).send({ data: updatedUser, message: 'order updated successfully' });
        } else {
            res.status(404).send({ message: 'order not found', status: 0 });
        }
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).send({ message: 'Internal server error', status: -1 });
    }
});



const deleteOrderDetails = catchAsync(async (req, res) => {
    const querry = req.params;

    const deleteUser = await orderDetailsService.deleteOrderDetailsById(querry);
    if (deleteUser) {
        res.status(httpStatus.OK).send({ message: 'order deleted successfully' });
    } else {
        res.status(httpStatus.NO_CONTENT).send({ message: 'Error in card delete' });
    }
});
module.exports = {
    createOrderDetails,
    deleteOrderDetails,
    getOrderDetails,
    updateOrderDetails,
    getOrderDetailsById
};
