const catchAsync = require('../utils/catchAsync');
const shipRocketService = require('../services/shipRocket.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const {Product, Users,OrderDetails,Orders,Address,Category, SubCategory, SubSubCategory,shiprocketOrder}=require("../models");

const shortid = require('shortid');


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


const createShiprocketOrder = async (req, res, orderDetailId) => {
  const userId = req.user.id;

  try {
    const orderDetails = await OrderDetails.findOne({
      where: { id: orderDetailId },
      include: [
        {
          model: Orders,
          include: [
            {
              model: Users,
              where: { isActive: true, status: true },
              include:[
               {
                model: Address,
                where: {defaultAddress: true },
               required: false, 
               }
              ]
            },
          ],
        },
        {
          model: Product,
          include: [Category, SubCategory, SubSubCategory],
        },
      ],
    });


    if (!orderDetails) {
      return res.status(404).send('Order details not found');
    }
    const order = orderDetails;
    const address = order.dataValues.Order.dataValues.User.dataValues.Addresses[0].dataValues.address;
    const order_items = [
      {
        name: orderDetails.Product.productName,
        sku: orderDetails.Product.sku,
        units: orderDetails.totalQuantity,
        selling_price: orderDetails.Product.finalAmount,
        discount: 0,
        tax: 12,
        hsn: 441122,
      },
    ];

    const orderObject = {
      order_id: shortid.generate(),
      order_date: "2023-11-17 11:11",
      pickup_location: "Lig Square",
      channel_id: "1845096",
      payment_method: "prepaid",
      sub_total: orderDetails.dataValues.calculatedAmount,
      shipping_is_billing: true,
      billing_address: address.address + address.houseNo,
      billing_state: address.state,
      billing_country: "India",
      billing_pincode: address.pinCode,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 2.5,
      order_items,
      billing_customer_name: order.dataValues.Order.dataValues.User.dataValues.firstName,
      billing_last_name: order.dataValues.Order.dataValues.User.dataValues.lastName,
      billing_email: order.dataValues.Order.dataValues.User.dataValues.email,
      billing_phone: order.dataValues.Order.dataValues.User.dataValues.phoneNumber,
    };

    if (order_items.length === 0) {
      return res.status(422).send({
        message: 'Shiprocket validation error',
        errors: { order_items: ['The order items field is required.'] },
        status_code: 422,
      });
    }

    const response = await shipRocketService.createOrder(orderObject);

    await shiprocketOrder.create({
      userId: userId, 
      orderDetailId: orderDetailId,
      shiprocketResponse: response,
      orderType: "New Order"
    });
   
    generateAWB(orderDetailId,response);
    
    res.send(response);
  } catch (error) {
    console.error(error);

    if (error.response && error.response.data && error.response.data.errors) {
      console.error('Validation errors:', error.response.data.errors);
      res.status(422).send({
        message: 'Shiprocket validation error',
        errors: error.response.data.errors,
        status_code: 422,
      });
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
};


const cancelShiprocketOrder= async(orderDetailId)=>{
  const Order = await shiprocketOrder.findOne({
    where: { orderDetailId: orderDetailId },
  })
  try{
        const orderData={
      ids:[Order.dataValues.shiprocketResponse.order_id]
    };
    const response=await shipRocketService.cancelOrder(orderData);
    await shiprocketOrder.update({status:false},{where:{orderDetailId:orderDetailId, orderType:"New Order"}})

    return(response);
  } catch(error){
    throw(error.response);
  }
};


const createReturnOrder= async(req,res,orderDetailId)=>{
  const userId=req.user.id;
  const orderDetails = await OrderDetails.findOne({
    where: { id: orderDetailId },
    include: [
      {
        model:shiprocketOrder
      },
      {
        model: Orders,
        include: [
          {
            model: Users,
            where: { isActive: true, status: true },
            include:[
             {
              model: Address,
              where: {defaultAddress: true },
             required: false, 
             }
            ]
          },
        ],
      },
      {
        model: Product,
        include: [Category, SubCategory, SubSubCategory],
      },
    ],
  });
  const userAddress=orderDetails.dataValues.Order.User.dataValues.Addresses[0].dataValues.address;
  try{
    const data={
      order_id: orderDetails.dataValues.shiprocketOrders[0].dataValues.shiprocketResponse.order_id,
      order_date: orderDetails.dataValues.shiprocketOrders[0].dataValues.createdAt,
      "channel_id": "1845096",
      pickup_customer_name: orderDetails.dataValues.Order.User.dataValues.firstName + orderDetails.dataValues.Order.User.dataValues.lastName,
      "pickup_last_name": "",
      "company_name":"iorn pvt ltd",
      pickup_address: userAddress.address+ userAddress.houseNo,
      "pickup_address_2": "",
      pickup_city: userAddress.city ,
      pickup_state: userAddress.state,
      "pickup_country": "India",
      pickup_pincode: userAddress.pinCode,
      pickup_email: orderDetails.dataValues.Order.User.dataValues.email,
      pickup_phone: orderDetails.dataValues.Order.User.dataValues.phoneNumber,
      "pickup_isd_code": "91",
      "shipping_customer_name": "Jax",
      "shipping_last_name": "Doe",
      "shipping_address": "Castle",
      "shipping_address_2": "Bridge",
      "shipping_city": "ghaziabad",
      "shipping_country": "India",
      "shipping_pincode": 201005,
      "shipping_state": "Uttarpardesh",
      "shipping_email": "kumar.abhishek@shiprocket.com",
      "shipping_isd_code": "91",
      "shipping_phone": 8888888888,
      "order_items": [
        {
          sku: orderDetails.dataValues.Order.dataValues.orderDetails[0].sku,
          name: orderDetails.dataValues.Order.dataValues.orderDetails[0].productName,
          units:orderDetails.dataValues.Order.dataValues.totalQuantity,
          selling_price:orderDetails.dataValues.Order.dataValues.orderDetails[0].finalAmount,
          "discount": 0,
          "qc_enable":true,
          "hsn": "123",
          "brand":orderDetails.dataValues.Order.dataValues.orderDetails[0].brandName,
          "qc_size":"43"
           }
        ],
      "payment_method": "PREPAID",
      "total_discount": "0",
      "sub_total":orderDetails.dataValues.Order.dataValues.totalAmount,
      "length": 11,
      "breadth": 11,
      "height": 11,
      "weight": 0.5
    }
    const response=await shipRocketService.createReturnOrder(data);
    await shiprocketOrder.create({
      userId: userId, 
      orderDetailId: orderDetailId,
      shiprocketResponse: response,
      orderType: "Return Order"
    });

    // generateAWBForReturn(orderDetailId,response);
    res.json(response);
  }catch(error){
    res.status(500).send(error.response.data);
  }

}

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

const generateAWB = async (orderDetailId,details) => {
  console.log("data checking-------------------------",orderDetailId,details);
  try {
    const data={
        shipment_id:details.shipment_id
    }
      const response = await shipRocketService.generateAWB(data);
    
    const awb_code= response.response.data.awb_code;
  
    if (!orderDetailId) {
      return res.status(400).json({ message: 'Invalid or missing order_id in the request parameters.' });
    }

    const updatedOrder = await shiprocketOrder.update(
      { awbCode: awb_code },
      { where: { orderDetailId: orderDetailId , orderType:"New Order" } }
    );

    const addTrakingUrl=await OrderDetails.update(
      {trackingLink:`https://shiprocket.co/tracking/${awb_code}`, trackingId:awb_code},
      {where:{id:orderDetailId}}
    )
    
    return ({ response, updatedOrder });
  } catch (error) {
    return(error.response.data);
  }
};

const generateAWBForReturn = async (orderDetailId,details) => {
  console.log("data====================",details.status)
  try {
    const data={
        shipment_id:details.shipment_id
    }
      const response = await shipRocketService.generateAWB(data);
    
    const awb_code= response.response.data.awb_code;
  
    if (!orderDetailId) {
      return res.status(400).json({ message: 'Invalid or missing order_id in the request parameters.' });
    }

    const updatedOrder = await shiprocketOrder.update(
      { awbCode: awb_code },
      { where: { orderDetailId: orderDetailId , orderType:"Return Order"}}
    );
    
    console.log(response,updatedOrder)
    return ({ response, updatedOrder });
  } catch (error) {
    return(error.response.data);
  }
};






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
    generateInvoice,
    generateAWB,
    generateAWBForReturn
}