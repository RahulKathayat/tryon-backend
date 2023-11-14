const { paymentLog,Orders,Users } = require('../models');

const createPaymentLog = async (body, userId) => {
    let data = body;
    data = {
      ...body,
      userId: userId
    };
    return paymentLog.create(data);
  };


  const getPaymentLog = async (userId) => {
    try {
  
      const data = await paymentLog.findAll({
        where: { userId: userId },
        include:[{model:Orders},{model:Users}]
      });
  
      return data
    } catch (error) {
      console.error('Error fetching payment log:', error);
      throw error;
    }
  };
  


  module.exports={
    createPaymentLog,
    getPaymentLog
  }