const express = require('express');
const {shipRocketController } = require('../../controllers');
const router=express.Router();

router.post('/createOrder',shipRocketController.createShiprocketOrder)

module.exports=router;