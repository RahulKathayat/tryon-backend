const { Category, SubCategory, SubSubCategory } = require('../models');
const subCategory = require('../models/subCategory');

const createCategory = async (_userBody) => {
  const userBody = _userBody;
  const data = await Category.create(userBody);
  console.log('data', data);
  return data;
};

const getCategory = async (query, options) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Category.findAndCountAll({
    where: query,
    order: [['isSequence', 'ASC']],
    limit,
    offset
  });
  return support;
};

const getCategoryForAdmin = async (query, options,userId) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await Category.findAndCountAll({
    where: query,
    order: [['updatedAt', 'DESC']],
    limit,
    offset
  });
  return support;
};



const getAll = async () => {
  try {
    const data = await Category.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('category not found!!', error);
  }
};
const getAllCategory = async () => {
  try {
    const data = await Category.findAll({
      where: {},
      // include: [{ model: SubCategory }, { model: SubSubCategory }]
      include: [
        {
          model: SubCategory,
          include: [
            {
              model: SubSubCategory
            }
          ]
        }
      ]
    });
    return data;
  } catch (error) {
    console.error('category not found!!', error);
  }
};

const getCategoryById = async (id) => {
  try {
    const data = await Category.findAll({
      where: { id: id }
    });
    return data;
  } catch (error) {
    console.error('category not found!!', error);
  }
};

const updateCategoryById = async (id, newData) => {
  const findData = await Category.findOne({
    where: id
  });
  if (findData) {
    return Category.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteCategoryById = async (Id) => {
  try {
    const data = await Category.findOne({ where: Id });

    if (!data) {
      throw new Error('Category not found');
    }
    data.status = 0;
    await data.save();

    console.log('Category deleted successfully');

    return { message: 'Category deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategoryById,
  deleteCategoryById,
  getCategoryById,
  getAllCategory,
  getAll,
  getCategoryForAdmin
};
