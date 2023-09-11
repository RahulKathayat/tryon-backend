const { Product, Category, SubCategory, SubSubCategory, ProductDetails } = require('../models');

const createProduct = async (_userBody) => {
  const userBody = _userBody;
  return Product.create(userBody);
};

const getProduct = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Product.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    include: [{ model: ProductDetails }, { model: Category }, { model: SubCategory }, { model: SubSubCategory }],
    limit,
    offset
  });
  return support;
};

const getProductById = async (id) => {
  try {
    const data = await Product.findAll({
      where: { id: id },
      include: [{ model: ProductDetails }, { model: Category }, { model: SubCategory }, { model: SubSubCategory }]
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
};

const deleteProductById = async (Id) => {
  try {
    const user = await Product.findOne({ where: Id });

    if (!user) {
      throw new Error('Product not found');
    }
    await user.update({ status: false });

    console.log('Product deleted successfully');

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
  getProductById
};
