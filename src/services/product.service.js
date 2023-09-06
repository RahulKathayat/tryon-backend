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
    console.error('product not found!!', error);
  }
};

const getProductById = async (id) => {
  try {
    const data = await Product.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('product not found!!', error);
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


const deleteProductById = async (Id) => {
  try {
    const user = await Product.findOne({ where:   Id  });

    if (!user) {
      throw new Error('Product not found');
    }
    await user.update({ status: false });

    console.log("Product deleted successfully");

    return { message: 'Product deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};



module.exports = {
  createProduct,
  getProduct,
  updateProductById,
  deleteProductById,
  getProductById,
  
  
};
