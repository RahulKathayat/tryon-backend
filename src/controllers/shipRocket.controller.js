const catchAsync = require('../utils/catchAsync');
const shipRocketService = require('../services/shipRocket.service');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const {Product, Users,OrderDetails,Orders,Cart,Address,Category, SubCategory, SubSubCategory}=require("../models");
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


// const createShiprocketOrder = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const user = await Users.findOne({
//       where: { id: userId, isActive: true, status: true },
//       include: [
//         {
//           model: Address,
//           where: {defaultAddress: true },
//           required: false, // Use required: false to perform a LEFT JOIN
//         },
//         { model: Cart },
//         {
//           model: Orders,
//           include: [
//             {
//               model: OrderDetails,
//               include: [
//                 {
//                   model: Product,
//                   include: [Category, SubCategory, SubSubCategory],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     });

//     let address=user.dataValues.Addresses[0].dataValues.address;
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     let order_items = user.Orders.flatMap((order) =>
//       order.OrderDetails.map((item) => {
//         if (item && item.dataValues && item.dataValues.Product && item.dataValues.Product.dataValues) {
//           const product = item.dataValues.Product.dataValues;

//           return {
//             name:product.productName,
//             sku:shortid.generate(),
//             units: 1,
//             selling_price:product.finalAmount,
//             discount: 0,
//             tax: 12,
//             hsn: 441122,
//           };
//         }

//         return null; 
//       })
//     ).filter(Boolean); // Remove null values from the array
//     const orderObject = {
//       order_id:shortid.generate(),
//       order_date: "2023-11-17 11:11",
//       pickup_location: "Lig Square",
//       channel_id: "1845096",
//       payment_method: "prepaid",
//       sub_total:user.Orders[0].dataValues.totalAmount,
//       shipping_is_billing: true,
//       billing_address:address.address+address.houseNo,
//       billing_state:address.state,
//       billing_country: "India",
//       billing_pincode:address.pinCode,
//       length: 10,
//       breadth: 15,
//       height: 20,
//       weight: 2.5,
//       order_items,
//       billing_customer_name: user.firstName,
//       billing_last_name: user.lastName,
//       billing_email: user.email,
//       billing_phone: user.phoneNumber,
//     };

//     if (order_items.length === 0) {
//       return res.status(422).send({
//         message: 'Shiprocket validation error',
//         errors: { order_items: ['The order items field is required.'] },
//         status_code: 422,
//       });
//     }
//     const response = await shipRocketService.createOrder(orderObject);
//     res.send(response);
//   } catch (error) {
//     console.error(error);

//     if (error.response && error.response.data && error.response.data.errors) {
//       console.error('Validation errors:', error.response.data.errors);
//       res.status(422).send({
//         message: 'Shiprocket validation error',
//         errors: error.response.data.errors,
//         status_code: 422,
//       });
//     } else {
//       res.status(500).send('Internal Server Error');
//     }
//   }
// };

const createShiprocketOrder = async (req, res, orderId) => {
  console.log("orderid------------------------------------",orderId);
  const userId = req.user.id;

  try {
    const user = await Users.findOne({
      where: { id: userId, isActive: true, status: true },
      include: [
        {
          model: Address,
          where: { defaultAddress: true },
          required: false,
        },
        { model: Cart },
        {
          model: Orders,
          where: { id: orderId }, 
          include: [
            {
              model: OrderDetails,
              include: [
                {
                  model: Product,
                  include: [Category, SubCategory, SubSubCategory],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const address = user.Addresses[0].dataValues.address;
    let order_items = user.Orders[0].OrderDetails.map((item) => {
      const product = item.Product.dataValues;
      console.log("orderItems====================================",user.Orders[0].OrderDetails)
      console.log("quantity----------------------------",product.sku)

      return {
        name: product.productName,
        sku:product.sku,
        units:item.totalQuantity,
        selling_price: product.finalAmount,
        discount: 0,
        tax: 12,
        hsn: 441122,
      };
    });

    const orderObject = {
      order_id: shortid.generate(),
      order_date: "2023-11-17 11:11",
      pickup_location: "Lig Square",
      channel_id: "1845096",
      payment_method: "prepaid",
      sub_total: user.Orders[0].dataValues.totalAmount,
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
      billing_customer_name: user.firstName,
      billing_last_name: user.lastName,
      billing_email: user.email,
      billing_phone: user.phoneNumber,
    };

    if (order_items.length === 0) {
      return res.status(422).send({
        message: 'Shiprocket validation error',
        errors: { order_items: ['The order items field is required.'] },
        status_code: 422,
      });
    }

    const response = await shipRocketService.createOrder(orderObject);
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
    generateInvoice,
}