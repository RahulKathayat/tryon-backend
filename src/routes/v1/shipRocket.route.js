const express = require('express');
const {shipRocketController } = require('../../controllers');
const router=express.Router();

router.post('/shipRocketToken',shipRocketController.generateShipRocketToken)

router.get('/getAllOrders',shipRocketController.getAllOrders)
router.post('/createOrder',shipRocketController.createShiprocketOrder)
router.post('/cancelOrder',shipRocketController.cancelShiprocketOrder)

router.post('/createReturnOrder',shipRocketController.createReturnOrder)
router.get('/getAllReturnOrder',shipRocketController.getAllReturnOrder)

router.post('/addPickupAddress',shipRocketController.addPickupAddress)
router.get('/getAllPickupAddress',shipRocketController.getAllPickupAddress)

router.get('/getAllShipments',shipRocketController.getAllShipments)

router.post('/generateInvoice',shipRocketController.generateInvoice)

module.exports=router;