const axios = require('axios');
const shipRocket=require('../config/shipRocket')


const generateShipRocketToken = async (newData) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/auth/login';
  try {  
    const response = await axios.post(SHIPROCKET_API_URL,newData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjQyMzA3OCwiZXhwIjoxNjk3Mjg3MDc4LCJuYmYiOjE2OTY0MjMwNzgsImp0aSI6IkROQmU2RTFXQWJnNjJEbDUiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.YUlc4L1NETgmWgo4PON6tMfB97t5VU1zn1LErZ6N-XM'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      },
    });
    return response.data;
} catch (error) {
    console.error('Error in creating orders:', error);
    throw error;
  }
};

const getAllOrders=async()=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/orders';
  try{
    const response=await axios.get(SHIPROCKET_API_URL,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    })
    return response.data
  }
  catch(error){
    console.error('Error in Adding Pickup Address:',error);
    throw error;
  }
}

const createOrder = async (orderData) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc';
  try {  
    const response = await axios.post(SHIPROCKET_API_URL,orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjQyMzA3OCwiZXhwIjoxNjk3Mjg3MDc4LCJuYmYiOjE2OTY0MjMwNzgsImp0aSI6IkROQmU2RTFXQWJnNjJEbDUiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.YUlc4L1NETgmWgo4PON6tMfB97t5VU1zn1LErZ6N-XM'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      },
    });
    return response.data;
} catch (error) {
    console.error('Error in creating orders:', error);
    throw error;
  }
};


const cancelOrder=async(orderData)=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/orders/cancel';
  try{
    const response=await axios.post(SHIPROCKET_API_URL,orderData, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    });
    return response.data;
  }
  catch(error){
    console.error('Error in Canceling Order:',error);
    throw error;
  }
}

const createReturnOrder=async(data)=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/orders/create/return';
  try{
    const response=await axios.post(SHIPROCKET_API_URL,data, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    });
    return response.data;
  }
  catch(error){
    console.error('Error in Canceling Order:',error);
    throw error;
  }
}

const getAllReturnOrder=async()=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/orders/processing/return';
  try{
    const response=await axios.get(SHIPROCKET_API_URL,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    })
    return response.data
  }
  catch(error){
    console.error('Error in Adding Pickup Address:',error);
    throw error;
  }
}

const addPickupAddress=async(newData)=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/settings/company/addpickup';
  try{
    const response=await axios.post(SHIPROCKET_API_URL,newData,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    })
    return response.data
  }
  catch(error){
    console.error('Error in Adding Pickup Address:',error);
    throw error;
  }
}

const getAllPickupAddress=async()=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/settings/company/pickup?';
  try{
    const response=await axios.get(SHIPROCKET_API_URL,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    })
    return response.data
  }
  catch(error){
    console.error('Error in Adding Pickup Address:',error);
    throw error;
  }
}

const getAllShipments=async()=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/shipments';
  try{
    const response=await axios.get(SHIPROCKET_API_URL,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    })
    return response.data
  }
  catch(error){
    console.error('Error in Adding Pickup Address:',error);
    throw error;
  }
}

const generateInvoice=async(newData)=>{
  const SHIPROCKET_API_URL='https://apiv2.shiprocket.in/v1/external/orders/print/invoice';
  try{
    const response=await axios.post(SHIPROCKET_API_URL,newData,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTY5NjUxOTYyMiwiZXhwIjoxNjk3MzgzNjIyLCJuYmYiOjE2OTY1MTk2MjIsImp0aSI6Imw3QWFEY2xzOXhaU0pjSEsiLCJzdWIiOjQwMTQ1NjQsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.x4B6-Ak-ReUHCEzaEB9qcj_dXjCrt2PuXTR4JySsegY'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'

      },
    })
    return response.data
  }
  catch(error){
    console.error('Error in Adding Pickup Address:',error);
    throw error;
  }
}

module.exports = {
  generateShipRocketToken,
  getAllOrders,
  createOrder,
  cancelOrder,
  createReturnOrder,
  getAllReturnOrder,
  addPickupAddress,
  getAllPickupAddress,
  getAllShipments,
  generateInvoice
};