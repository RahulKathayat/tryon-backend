const { Product } = require('../models');

const createProduct = async (_userBody) => {
  const userBody = _userBody;
  return Product.create(userBody);
};

const getProduct = async () => {
  try {
    const data = await Product.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
  }
};

const getProductById = async (id) => {
  try {
    const data = await Product.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('card not found!!', error);
  }
};

const updateProductById = async (id, newData) => {
  const findData = await Product.findOne({
    where: id
  });
  if (findData) {
    return Product.update(newData, { where: id });
  } else {
    return;
  }
}


const deleteProductById = async (id) => {
  return Product.destroy({
    where: id
  });
};

module.exports = {
  createProduct,
  getProduct,
  updateProductById,
  deleteProductById,
  getProductById
  
};
