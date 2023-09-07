const { ProductDetails } = require('../models');

const createProductDetail = async (_userBody) => {
  const userBody = _userBody;
  return ProductDetails.create(userBody);
};

const getProductDetail = async () => {
  try {
    const data = await ProductDetails.findAll({
      where: {status:true}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
  }
};

const getProductDetailById = async (id) => {
  try {
    const data = await ProductDetails.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
  }
};

const updateProductDetailById = async (id, newData) => {
  const findData = await ProductDetails.findOne({
    where: id
  });
  if (findData) {
    return ProductDetails.update(newData, { where: id });
  } else {
    return;
  }
}


const deleteProductDetailById = async (Id) => {
  try {
    const user = await ProductDetails.findOne({ where:   Id  });

    if (!user) {
      throw new Error('ProductDetails not found');
    }
    await user.update({ status: false });

    console.log("ProductDetails deleted successfully");

    return { message: 'ProductDetails deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  createProductDetail,
  getProductDetail,
  updateProductDetailById,
  deleteProductDetailById,
  getProductDetailById
  
};
