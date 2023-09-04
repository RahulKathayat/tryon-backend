const { Category } = require('../models');

const createCategory = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await Category.create(userBody);
   console.log("data",data);
   return data
};

const getCategory = async () => {
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
      where: {id:id}
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
}


const deleteCategoryById = async (id) => {
  return Category.destroy({
    where: id
  });
};

module.exports = {
    createCategory,
    getCategory,
    updateCategoryById,
    deleteCategoryById,
    getCategoryById
  
};
