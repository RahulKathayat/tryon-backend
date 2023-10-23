const { Product, Category, SubCategory, SubSubCategory } = require('../models');
const { Op } = require('sequelize');

const createProduct = async (_userBody) => {
  const userBody = _userBody;
  const colour = _userBody.colour;
  const size = _userBody.size;
  _userBody.colour = JSON.stringify(colour);
  _userBody.size = JSON.stringify(size);
  return Product.create(userBody);
};

const getProduct = async (query, options, between) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;

  if (between.priceFrom && between.priceTo) {
    query.totalPrice = {
      [Op.between]: [between.priceFrom, between.priceTo]
    };
  } else if (between.priceFrom) {
    query.totalPrice = {
      [Op.gte]: between.priceFrom
    };
  } else if (between.priceTo) {
    query.totalPrice = {
      [Op.lte]: between.priceTo
    };
  }
  const support = await Product.findAndCountAll({
    where: query,
    order: [
      ['updatedAt', 'DESC'],
      ['totalPrice', 'DESC'],
      ['totalPrice', 'ASC']
    ],
    include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }],
    limit,
    offset
  });
  return support;
};

const getProductBySearch = async (query, options) => {
  try {
    const limit = Number(options.limit);
    const offset = options.page ? limit * (options.page - 1) : 0;

    if (query == null || options == null) {
      const data = await Product.findAndCountAll({
        limit: limit,
        offset: offset
      });

      return data;
    } else {
      const data = await Product.findAndCountAll({
        where: { ...query },
        limit: limit,
        offset: offset
      });

      return data;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const getHighToLowPrice = async (id) => {
  try {
    const data = await Product.findAll({
      order: [['totalPrice', 'DESC']]
    });
    console.log('data==========================');
    return data;
  } catch (error) {
    console.error('product not found!!', error);
  }
};
const getLowToHighPrice = async (id) => {
  try {
    const data = await Product.findAll({
      order: [['totalPrice', 'ASC']]
    });
    return data;
  } catch (error) {
    console.error('product not found!!', error);
  }
};

const isUpcomingProduct = async (options) => {
  try {
    const limit = 1;
    const offset = 2;
    const data = await Product.findAll({
      where: { productType: (productType = 3) },
      order: [['updatedAt', 'ASC']],
      offset,
      limit
    });
    console.log('data=================================', data);
    return data;
  } catch (error) {
    console.error('Data not found', error);
  }
};

const getProductById = async (id) => {
  try {
    const data = await Product.findAll({
      where: { id: id },
      include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }]
    });
    return data;
  } catch (error) {
    console.error('product not found!!', error);
  }
};

const updateProductById = async (id, newData) => {
  try {
    const findData = await Product.findOne({
      where: id
    });
    let colour = newData.colour;
    let size = newData.size;
    newData.colour = JSON.stringify(colour);
    newData.size = JSON.stringify(size);
    if (findData) {
      return Product.update(newData, { where: id });
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
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

// const updateImage = async (id, newData) => {
//   const findData = await Product.findOne({
//     where: { id: id }
//   });
//   if (findData) {
//     return Product.update({ image: newData }, { where: { id: id } });
//   } else {
//     return;
//   }
// };

module.exports = {
  createProduct,
  getProduct,
  updateProductById,
  deleteProductById,
  getProductById,
  getLowToHighPrice,
  getHighToLowPrice,
  isUpcomingProduct,
  getProductBySearch
  // updateImage
};
