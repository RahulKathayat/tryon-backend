const catchAsync = require('../utils/catchAsync');
const shipRocketService = require('../services/shipRocket.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');


const generateShipRocketToken = async (req, res) => {
  try {
    const newData = req.body;
    const response = await shipRocketService.generateShipRocketToken(newData);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};


const getAllOrders=async(req,res)=>{
  try{
    const response=await shipRocketService.getAllOrders();
    res.json(response);
  }
  catch(error){
    res.status(500).send(error.response.data);
  }
}

const createShiprocketOrder = async (req, res) => {
    try {
      const orderData = req.body;
      const response = await shipRocketService.createOrder(orderData);
      res.json(response);
    } catch (error) {
      res.status(500).send(error.response.data);
    }
  };

const cancelShiprocketOrder= async(req,res)=>{
  try{
    const orderData=req.body;
    const response=await shipRocketService.cancelOrder(orderData);
    res.json(response);
  } catch(error){
    res.status(500).send(error.response.data);
  }
};

const createReturnOrder= async(req,res)=>{
  try{
    const data=req.body;
    const response=await shipRocketService.createReturnOrder(data);
    res.json(response);
  } catch(error){
    res.status(500).send(error.response.data);
  }
};

const getAllReturnOrder=async(req,res)=>{
  try{
    const response=await shipRocketService.getAllReturnOrder();
    res.json(response);
  }
  catch(error){
    res.status(500).send(error.response.data);
  }
}

const addPickupAddress=async(req,res)=>{
  try{
    const newData=req.body;
    const response=await shipRocketService.addPickupAddress(newData);
    res.json(response);
  }
  catch(error){
    res.status(500).send(error.response.data);
  }
}

const getAllPickupAddress=async(req,res)=>{
  try{
    const response=await shipRocketService.getAllPickupAddress();
    res.json(response);
  }
  catch(error){
    res.status(500).send(error.response.data);
  }
}

const getAllShipments=async(req,res)=>{
  try{
    const response=await shipRocketService.getAllShipments();
    res.json(response);
  }
  catch(error){
    res.status(500).send(error.response.data);
  }
}

const generateInvoice=async(req,res)=>{
  try{
    const newData=req.body;
    const response=await shipRocketService.generateInvoice(newData);
    res.json(response);
  }
  catch(error){
    res.status(500).send(error.response.data);
  }
}

module.exports={
    generateShipRocketToken,
    getAllOrders,
    createShiprocketOrder,
    cancelShiprocketOrder,
    createReturnOrder,
    getAllReturnOrder,
    addPickupAddress,
    getAllPickupAddress,
    getAllShipments,
    generateInvoice

}