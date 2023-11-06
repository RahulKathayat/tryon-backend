const { Product, Category, SubCategory, SubSubCategory, Ratings } = require('../models');
const { Op } = require('sequelize');
const cron = require('node-cron');

const createProduct = async (_userBody) => {
  let userBody = _userBody;
  const colour = _userBody.colour;
  const size = _userBody.size;
  _userBody.colour = JSON.stringify(colour);
  _userBody.size = JSON.stringify(size);
  let finalAmount = userBody.totalPrice - ((userBody.totalPrice * userBody.discountPercentage) / 100).toFixed(2);
  finalAmount = finalAmount.toFixed(2);
  console.log('final amoutn===============', finalAmount);
  userBody = {
    ...userBody,
    finalAmount: finalAmount
  };
  return Product.create(userBody);
};

const getProductByproductId = async (id) => {
  let promises = id.map(async (item) => {
    return Product.findAll({
      where: { id: item.productId }
    });
  });

  let results = await Promise.all(promises);

  // Flatten the results in case `Product.findAll` returns arrays
  let suppordata;
  return (suppordata = [].concat(...results));

  console.log('hrergt==============================================', suppordata);
};

const getProduct = async (query, options, between, order) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;

  let orderCriteria = [['createdAt', 'DESC']]; // Default order criteria

  if (order === 'desc') {
    orderCriteria = [['finalAmount', 'DESC']];
  } else if (order == 'asc') {
    orderCriteria = [['finalAmount', 'ASC']];
  }

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

  const products = await Product.findAll({
    where: query,
    order: orderCriteria,
    include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }],
    limit,
    offset
  });
  return products;
  // });

  // return ProductWithFinalAmount; // This is now an array with the finalAmount added.
};

// const getProductBySearch = async (query, options, order) => {
//   try {
//     const limit = Number(options.limit);
//     const offset = options.page ? limit * (options.page - 1) : 0;

//     if (query && query.search) {
//       query.search = decodeURIComponent(query.search);
//       query.search = query.search.replace(/\"%/g, '').replace(/%\"/g, ''); // Remove extra quotes and percent signs.
//     }

//     let orderCriteria = [['finalAmount', 'ASC']]; // Default order criteria (ascending)

//     if (order === 'desc') {
//       orderCriteria = [['finalAmount', 'DESC']]; // If order is 'desc', change the order criteria to descending
//     }

//     if (query == null || options == null) {
//       const data = await Product.findAndCountAll({
//         limit: limit,
//         offset: offset,
//         order: orderCriteria
//       });
//       return data;
//     } else {
//       const data = await Product.findAndCountAll({
//         where: { ...query },
//         limit: limit,
//         offset: offset,
//         order: orderCriteria
//       });
//       return data;
//     }
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// };

const getProductBySearch = async (query, options) => {
  try {
    const limit = Number(options.limit);
    const offset = options.page ? limit * (options.page - 1) : 0;

    if (query && query.search) {
      query.search = decodeURIComponent(query.search);
      query.search = query.search.replace(/\"%/g, '').replace(/%\"/g, ''); // Remove extra quotes and percent signs.
    }

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
  s;
};

const getHighToLowPrice = async (id) => {
  try {
    const data = await Product.findAll({
      order: [['finalAmount', 'DESC']]
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
      order: [['finalAmount', 'ASC']]
    });
    return data;
  } catch (error) {
    console.error('product not found!!', error);
  }
};

const isUpcomingProduct = async (options) => {
  try {
    const limit = 2;
    const offset = 0;
    const data = await Product.findAndCountAll({
      where: { productType: 3 },
      order: [['createdAt', 'DESC']],
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

const updateProductById = async (id, data) => {
  try {
    const findData = await Product.findOne({
      where: id
    });
    let newData = data;
    let colour = newData.colour;
    let size = newData.size;
    newData.colour = JSON.stringify(colour);
    newData.size = JSON.stringify(size);
    const finalAmount = newData.totalPrice - [(newData.totalPrice * newData.discountPercentage) / 100];
    newData = {
      ...newData,
      finalAmount: finalAmount
    };
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

const getProductForWishlist = async (query, options, between, order) => {
  try {
    const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;

  let orderCriteria = [['createdAt', 'DESC']]; // Default order criteria

  if (order === 'desc') {
    orderCriteria = [['finalAmount', 'DESC']];
  } else if (order == 'asc') {
    orderCriteria = [['finalAmount', 'ASC']];
  }

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

  const products = await Product.findAll({
    where: query,
    order: orderCriteria,
    include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }],
    limit,
    offset
  });
  return products;
  } catch (error) {
    console.error('Error fetching products!', error);
    throw error;
  }
};

const updateAvrageRatings = async (data) => {
  try {
    data.map((item) => {
      const avrageData = { averageRating: item.averageRating };
      const id = { id: item.productId };
      return Product.update(avrageData, { where: id });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createProduct,
  updateAvrageRatings,
  getProduct,
  updateProductById,
  deleteProductById,
  getProductById,
  getLowToHighPrice,
  getHighToLowPrice,
  isUpcomingProduct,
  getProductBySearch,
  getProductForWishlist,
  getProductByproductId
  // updateImage
};
