const { SubSubCategory, SubCategory, Category } = require('../models');
// const SubSubCategory = require('../models/subSubCategory');

const createSubSubCategory = async (_userBody) => {
  const userBody = _userBody;
  const data = await SubSubCategory.create(userBody);

  return data;
};

const getSubSubCategory = async (query, options, subCategoryId) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  if (subCategoryId == null) {
    const support = await SubSubCategory.findAndCountAll({
      where: query,
      order: [['updatedAt', 'DESC']],
      // include: [{ model: SubCategory }, { model: Category }],
      include: [
        {
          model: SubCategory,
          include: [
            {
              model: Category
            }
          ]
        }
      ],

      limit,
      offset
    });
    return support;
  } else {
    const support = await SubSubCategory.findAndCountAll({
      where: { ...query, subCategoryId: subCategoryId },
      order: [['updatedAt', 'DESC']],
      include: [{ model: SubCategory }],
      limit,
      offset
    });
    return support;
  }
};

const getSubSubCategoryForAdmin = async (query, options, userId) => {
  const limit = Number(options.limit);
  const offset = options.page ? limit * (options.page - 1) : 0;
  if (query.subCategoryId == null) {
    const support = await SubSubCategory.findAndCountAll({
      where: query,
      order: [['updatedAt', 'DESC']],
      // include: [{ model: SubCategory }, { model: Category }],
      include: [
        {
          model: SubCategory,
          include: [
            {
              model: Category
            }
          ]
        }
      ],

      limit,
      offset
    });
    return support;
  } else {
    const support = await SubSubCategory.findAndCountAll({
      where: { ...query, subCategoryId: query.subCategoryId },
      order: [['updatedAt', 'DESC']],
      include: [{ model: SubCategory }],
      limit,
      offset
    });
    return support;
  }
};

const getAllSubSubCategories = async () => {
  try {
    const data = await SubSubCategory.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('subSubcategory not found!!', error);
  }
};

const getSubSubCategoryById = async (id) => {
  try {
    const data = await SubSubCategory.findAll({
      where: { id: id },
      include: [
        {
          model: SubCategory,
          include: [
            {
              model: Category
            }
          ]
        }
      ]
    });
    return data;
  } catch (error) {
    console.error('subSubcategory not found!!', error);
  }
};

const updateSubSubCategoryById = async (id, newData) => {
  const findData = await SubSubCategory.findOne({
    where: id
  });
  if (findData) {
    return SubSubCategory.update(newData, { where: id });
  } else {
    return;
  }
};

const deleteSubSubCategoryById = async (Id) => {
  try {
    const data = await SubSubCategory.findOne({ where: Id });

    if (!data) {
      throw new Error('SubSubCategory not found');
    }
    data.status = 0;
    await data.save();

    console.log('SubSubCategory deleted successfully');

    return { message: 'SubSubCategory deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createSubSubCategory,
  getSubSubCategory,
  updateSubSubCategoryById,
  deleteSubSubCategoryById,
  getSubSubCategoryById,
  getAllSubSubCategories,
  getSubSubCategoryForAdmin
};
