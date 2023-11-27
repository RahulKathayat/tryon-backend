const express = require('express');
const {shipRocketController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const orderService=require('../../services/order.service')

const router=express.Router();

router.post('/shipRocketToken',shipRocketController.generateShipRocketToken)

router.get('/getAllOrders',shipRocketController.getAllOrders)

router.post('/cancelOrder/:orderDetailId',async(req,res)=>{
  const orderDetailId=req.params.orderDetailId;
  await shipRocketController.cancelShiprocketOrder(req,res,orderDetailId)
})

router.post('/createReturnOrder/:orderDetailId',auth(),async(req,res)=>{
  const orderDetailId=req.params.orderDetailId;
  await shipRocketController.createReturnOrder(req,res,orderDetailId)
})
router.get('/getAllReturnOrder',shipRocketController.getAllReturnOrder)

router.post('/addPickupAddress',shipRocketController.addPickupAddress)
router.get('/getAllPickupAddress',shipRocketController.getAllPickupAddress)

router.get('/getAllShipments',shipRocketController.getAllShipments)

router.post('/generateInvoice',shipRocketController.generateInvoice)

router.post('/generateAWB/:orderDetailId',shipRocketController.generateAWB)

router.post('/createOrder/:orderDetailId', auth(), async (req, res) => {
    const orderDetailId = req.params.orderDetailId;
    await shipRocketController.createShiprocketOrder(req, res, orderDetailId);
  });
  
module.exports=router;