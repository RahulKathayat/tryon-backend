const axios = require('axios');
const shipRocket=require('../config/shipRocket')

const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc';

const createOrder = async (orderData) => {
  
    // const apiSecret = shipRocket.shiprocketApiSecret;
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

module.exports = {
  createOrder,
};
