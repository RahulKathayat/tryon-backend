const axios = require('axios');
const shipRocket = require('../config/shipRocket');

const generateShipRocketToken = async (newData) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/auth/login';
  try {
    const response = await axios.post(SHIPROCKET_API_URL, newData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in creating orders:', error);
    throw error;
  }
};

const getAllOrders = async () => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders';
  try {
    const response = await axios.get(SHIPROCKET_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDM4NTIxNCwiZXhwIjoxNzAxMjQ5MjE0LCJuYmYiOjE3MDAzODUyMTQsImp0aSI6InlseFVObk40d0lOd2k0WnciLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.O8VofwGFHofizz2MuV-GkNwXdnAGa29QbA9BMev3az4'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in Adding Pickup Address:', error);
    throw error;
  }
};

const createOrder = async (orderData) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc';
  try {
    const response = await axios.post(SHIPROCKET_API_URL, orderData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDU3ODMwNiwiZXhwIjoxNzAxNDQyMzA2LCJuYmYiOjE3MDA1NzgzMDYsImp0aSI6IjFxTG9wVHo5U1BkUklKbjgiLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.RKTQ7kWtczapLih9jf8QYOvcTQ4EhBaB8IZfqcNR6ts'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;

  } catch (error) {
    console.error('Error in creating orders:', error);
    throw error;
  }
};

const cancelOrder = async (orderData) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders/cancel';
  try {
    const response = await axios.post(SHIPROCKET_API_URL, orderData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDM4NTIxNCwiZXhwIjoxNzAxMjQ5MjE0LCJuYmYiOjE3MDAzODUyMTQsImp0aSI6InlseFVObk40d0lOd2k0WnciLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.O8VofwGFHofizz2MuV-GkNwXdnAGa29QbA9BMev3az4'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in Canceling Order:', error);
    throw error;
  }
};

const createReturnOrder = async (data) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders/create/return';
  try {
    const response = await axios.post(SHIPROCKET_API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMTMyNzAwOSwiZXhwIjoxNzAyMTkxMDA5LCJuYmYiOjE3MDEzMjcwMDksImp0aSI6IjE3SE9YM1BLYWtyVzRnMFoiLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.csHCQfqfhN-obqaNdsU9T-zJ4p3oAt6ha02nw0JDck8'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in creating return Order:', error);
    throw error;
  }
};

const getAllReturnOrder = async () => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders/processing/return';
  try {
    const response = await axios.get(SHIPROCKET_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDM4NTIxNCwiZXhwIjoxNzAxMjQ5MjE0LCJuYmYiOjE3MDAzODUyMTQsImp0aSI6InlseFVObk40d0lOd2k0WnciLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.O8VofwGFHofizz2MuV-GkNwXdnAGa29QbA9BMev3az4'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetching return order:', error);
    throw error;
  }
};

const addPickupAddress = async (newData) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/settings/company/addpickup';
  try {
    const response = await axios.post(SHIPROCKET_API_URL, newData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDM4NTIxNCwiZXhwIjoxNzAxMjQ5MjE0LCJuYmYiOjE3MDAzODUyMTQsImp0aSI6InlseFVObk40d0lOd2k0WnciLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.O8VofwGFHofizz2MuV-GkNwXdnAGa29QbA9BMev3az4'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in Adding Pickup Address:', error);
    throw error;
  }
};

const getAllPickupAddress = async () => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/settings/company/pickup?';
  try {
    const response = await axios.get(SHIPROCKET_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDM4NTIxNCwiZXhwIjoxNzAxMjQ5MjE0LCJuYmYiOjE3MDAzODUyMTQsImp0aSI6InlseFVObk40d0lOd2k0WnciLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.O8VofwGFHofizz2MuV-GkNwXdnAGa29QbA9BMev3az4'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetching Pickup Address:', error);
    throw error;
  }
};

const getAllShipments = async () => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/shipments';
  try {
    const response = await axios.get(SHIPROCKET_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDM4NTIxNCwiZXhwIjoxNzAxMjQ5MjE0LCJuYmYiOjE3MDAzODUyMTQsImp0aSI6InlseFVObk40d0lOd2k0WnciLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.O8VofwGFHofizz2MuV-GkNwXdnAGa29QbA9BMev3az4'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetching shipments:', error);
    throw error;
  }
};

const generateInvoice = async (newData) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/orders/print/invoice';
  try {
    const response = await axios.post(SHIPROCKET_API_URL, newData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDM4NTIxNCwiZXhwIjoxNzAxMjQ5MjE0LCJuYmYiOjE3MDAzODUyMTQsImp0aSI6InlseFVObk40d0lOd2k0WnciLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.O8VofwGFHofizz2MuV-GkNwXdnAGa29QbA9BMev3az4'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in generating invoice:', error);
    throw error;
  }
};


const generateAWB = async (data) => {
  const SHIPROCKET_API_URL = 'https://apiv2.shiprocket.in/v1/external/courier/assign/awb';
  try {
    const response = await axios.post(SHIPROCKET_API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDU3ODMwNiwiZXhwIjoxNzAxNDQyMzA2LCJuYmYiOjE3MDA1NzgzMDYsImp0aSI6IjFxTG9wVHo5U1BkUklKbjgiLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.RKTQ7kWtczapLih9jf8QYOvcTQ4EhBaB8IZfqcNR6ts'
        // 'Authorization': 'Bearer {{SHIPROCKET_API_TOKEN}}'
      }
    });
    return response.data;
  } 
  catch (error) {
    console.error('Error in generating awb_code:', error);
    throw error;
  }
};


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
  generateInvoice,
  generateAWB
};




