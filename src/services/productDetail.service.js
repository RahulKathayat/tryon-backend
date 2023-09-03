const { ProductDetails } = require('../models');

const createProductDetail = async (_userBody) => {
  const userBody = _userBody;
  return ProductDetails.create(userBody);
};

const getProductDetail = async () => {
  try {
    const data = await ProductDetails.findAll({
      where: {}
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


const deleteProductDetailById = async (id) => {
  return ProductDetails.destroy({
    where: id
  });
};

module.exports = {
  createProductDetail,
  getProductDetail,
  updateProductDetailById,
  deleteProductDetailById,
  getProductDetailById
  
};
