const {paymentLog,Orders,Users}=require('../models')

const createPaymentLog = async (body, userId) => {
  try {
    const data = {
      ...body,
      userId: userId
    };
    
    const result = await paymentLog.create(data);
    return result;
  } catch (err) {
    console.log("error============", err);
    throw err; // Re-throw the error to propagate it up the call stack
  }
};


const getPaymentLog = async (userId) => {
  try {
    const data = await paymentLog.findAll({
      where: { userId: userId, isActive: true, status: true },
      include: [{ model: Orders }, { model: Users }]
    });

    return data;
  } catch (error) {
    console.error('Error fetching payment log:', error);
    throw error;
  }
};

const getPaymentLogForAdmin = async (userId) => {
  try {
    const data = await paymentLog.findAll({
      where: { status: true },
      include: [{ model: Orders }, { model: Users }]
    });

    return data;
  } catch (error) {
    console.error('Error fetching payment log:', error);
    throw error;
  }
};

module.exports = {
  createPaymentLog,
  getPaymentLog,
  getPaymentLogForAdmin
};
