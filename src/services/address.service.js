const { Address } = require('../models');

const createAddress = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await Address.create(userBody);
   console.log("data",data);
   return data
};

const getAddress= async () => {
  try {
    const data = await Address.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('address not found!!', error);
  }
};

const getAddressById = async (id) => {
  try {
    const data = await Address.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('address not found!!', error);
  }
};

const updateAddressById = async (id, newData) => {
  const findData = await Address.findOne({
    where: id
  });
  if (findData) {
    return Address.update(newData, { where: id });
  } else {
    return;
  }
}


const deleteAddressById = async (Id) => {
  try {
    const user = await Address.findOne({ where:   Id  });

    if (!user) {
      throw new Error('Address not found');
    }
    await user.update({ status: false });

    console.log("Address deleted successfully");

    return { message: 'Address deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
    createAddress,
    getAddress,
    updateAddressById,
    deleteAddressById,
    getAddressById
  
};
