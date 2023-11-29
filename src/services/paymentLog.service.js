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


async function checkPaymentStatus(userId, orderId) {
  try {
    // Fetch the payment log for the given user and order
    const checkPayment = await paymentLog.findOne({
      where: {
        userId: userId,
        orderId: orderId
      }
    });
    if (checkPayment && checkPayment.isActive === 1) {
      console.log("mno-----------------------------true")
      return true;
    } else {
      console.log('sDgJHKKJGV======================false')
      return false;
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
}

module.exports = {
  createPaymentLog,
  getPaymentLog,
  getPaymentLogForAdmin,
  checkPaymentStatus
};
