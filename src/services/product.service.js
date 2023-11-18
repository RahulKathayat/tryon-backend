const { Product, Category, SubCategory, SubSubCategory, Ratings } = require('../models');
const { Op } = require('sequelize');

const createProduct = async (_userBody) => {
  let userBody = _userBody;
  const colour = _userBody.colour;
  const size = _userBody.size;
  _userBody.colour = JSON.stringify(colour);
  _userBody.size = JSON.stringify(size);
  let finalAmount = userBody.totalPrice - ((userBody.totalPrice * userBody.discountPercentage) / 100).toFixed(2);
  finalAmount = finalAmount.toFixed(2);
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
};


const getProduct = async (query = {}, options = {}, between = {}, order = 'desc') => {
  let orderCriteria = [['createdAt', 'DESC']]; // Default order criteria
  // Check if any of the required parameters is undefined, and fetch all products if so
  if (
    Object.values(query).length === 0 ||
    Object.values(options).length === 0 ||
    Object.values(between).length === 0 ||
    order === undefined
  ) {
    const products = await Product.findAll({
      order: orderCriteria,
      include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }, { model: Ratings }]
    });
    return products;
  }
  // Parse limit and offset from options
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  // Update order criteria based on the provided order parameter
  if (order.toLowerCase() === 'asc') {
    orderCriteria = [['finalAmount', 'ASC']];
  } else if (order.toLowerCase() === 'desc') {
    orderCriteria = [['finalAmount', 'DESC']];
  }
  // Apply price range filtering
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
  // Fetch products based on the provided filters and options
  const products = await Product.findAll({
    where: query,
    order: orderCriteria,
    include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }, { model: Ratings }],
    limit,
    offset
  });
  
  return products;
};

const getProductForAdmin = async (query = {}, options = {}, between = {}, order = 'desc') => {
  let orderCriteria = [['createdAt', 'DESC']]; // Default order criteria
  // Check if any of the required parameters is undefined, and fetch all products if so
  if (
    Object.values(query).length === 0 ||
    Object.values(options).length === 0 ||
    Object.values(between).length === 0 ||
    order === undefined
  ) {
    const products = await Product.findAll({
      order: orderCriteria,
      include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }, { model: Ratings }]
    });
    return products;
  }
  // Parse limit and offset from options
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  // Update order criteria based on the provided order parameter
  if (order.toLowerCase() === 'asc') {
    orderCriteria = [['finalAmount', 'ASC']];
  } else if (order.toLowerCase() === 'desc') {
    orderCriteria = [['finalAmount', 'DESC']];
  }
  // Apply price range filtering
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
  // Fetch products based on the provided filters and options
  const products = await Product.findAll({
    where: query,
    order: orderCriteria,
    include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }, { model: Ratings }],
    limit,
    offset
  });
  return products;
};

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
    return data;
  } catch (error) {
    console.error('Data not found', error);
  }
};

const getProductById = async (id) => {
  try {
    const data = await Product.findAll({
      where: { id: id },
      include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }, { model: Ratings }]
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
    const data = await Product.findOne({ where: Id });

    if (!data) {
      throw new Error('Product not found');
    }
    data.status = 0;
    await data.save();

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
      include: [{ model: Category }, { model: SubCategory }, { model: SubSubCategory }, { model: Ratings }],
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
  getProductByproductId,
  getProductForAdmin
  // updateImage
};
