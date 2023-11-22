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
    console.error('Error in Adding Pickup Address:', error);
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
    console.error('Error in Adding Pickup Address:', error);
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
    console.error('Error in Adding Pickup Address:', error);
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
    console.error('Error in Adding Pickup Address:', error);
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
};


// const axios = require('axios');

const apiUrl = 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaXYyLnNoaXByb2NrZXQuaW4vdjEvZXh0ZXJuYWwvYXV0aC9sb2dpbiIsImlhdCI6MTcwMDUwNjQxMywiZXhwIjoxNzAxMzcwNDEzLCJuYmYiOjE3MDA1MDY0MTMsImp0aSI6IkRMV1RmdmJLMUlWSmpsZ1AiLCJzdWIiOjQxMjA1NjEsInBydiI6IjA1YmI2NjBmNjdjYWM3NDVmN2IzZGExZWVmMTk3MTk1YTIxMWU2ZDkifQ.-jUcXIaV_O5qUvliG8CpQFUpCSBgaXdQVI6nclIQNqM'; // Replace with your Shiprocket API access token

const requestData = {
  order_id: '202',
  order_date: '2023-11-15 11:11',
  // pickup_location: 'Mumbai',
  billing_customer_name: 'Anjani',
  billing_last_name: 'Soni',
  billing_address: 'House 111',
  billing_address_2: '',
  billing_city: 'New Delhi',
  billing_pincode: '110076',
  billing_state: 'Delhi',
  billing_country: 'India',
  billing_email: 'anjani@gmail.com',
  billing_phone: '9540608104',
  shipping_is_billing: true,
  shipping_customer_name: '',
  shipping_last_name: '',
  shipping_address: '',
  shipping_address_2: '',
  shipping_city: '',
  shipping_pincode: '',
  shipping_country: '',
  shipping_state: '',
  shipping_email: '',
  shipping_phone: '',
  order_items: [
    {
      name: 'TShirt',
      sku: 'tshirt',
      units: 10,
      selling_price: '900',
      discount: '',
      tax: '',
      hsn: 441122,
    },
  ],
  payment_method: 'Prepaid',
  shipping_charges: 0,
  giftwrap_charges: 0,
  transaction_charges: 0,
  total_discount: 0,
  sub_total: 9000,
  length: 10,
  breadth: 15,
  height: 20,
  weight: 2.5,
};

// axios.post(apiUrl, requestData, {

//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   },

  
// })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error.response.data);
//   });




