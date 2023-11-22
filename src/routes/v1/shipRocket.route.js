const express = require('express');
const {shipRocketController } = require('../../controllers');
const auth = require('../../middlewares/auth');
const orderService=require('../../services/order.service')

const router=express.Router();

router.post('/shipRocketToken',shipRocketController.generateShipRocketToken)

router.get('/getAllOrders',shipRocketController.getAllOrders)
// router.post('/createOrder',auth(),shipRocketController.createShiprocketOrder)
router.post('/cancelOrder',shipRocketController.cancelShiprocketOrder)

router.post('/createReturnOrder',shipRocketController.createReturnOrder)
router.get('/getAllReturnOrder',shipRocketController.getAllReturnOrder)

router.post('/addPickupAddress',shipRocketController.addPickupAddress)
router.get('/getAllPickupAddress',shipRocketController.getAllPickupAddress)

router.get('/getAllShipments',shipRocketController.getAllShipments)

router.post('/generateInvoice',shipRocketController.generateInvoice)

router.post('/createOrder/:orderId', auth(), async (req, res) => {
    const orderId = req.params.orderId;
    await shipRocketController.createShiprocketOrder(req, res, orderId);
  });
  
module.exports=router;