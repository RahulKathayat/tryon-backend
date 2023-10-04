const catchAsync = require('../utils/catchAsync');
const shipRocketService = require('../services/shipRocket.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');


const createShiprocketOrder = async (req, res) => {
    try {
      const orderData = req.body;
      const response = await shipRocketService.createOrder(orderData);
      res.json(response);
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  };
module.exports={
    createShiprocketOrder
}