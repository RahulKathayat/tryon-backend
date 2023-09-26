const { Category } = require('../models');

const createCategory = async (_userBody) => {
  const userBody = _userBody;
  console.log('===============', userBody);
  const data = await Category.create(userBody);
  console.log('data', data);
  return data;
};

const getCategory = async (query, options) => {
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

const getAllCategory = async () => {
  try {
    const data = await Category.findAll({
      where: {}
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
    const user = await Category.findOne({ where: Id });

    if (!user) {
      throw new Error('Category not found');
    }
    await user.update({ status: false });

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
  getAllCategory
};
