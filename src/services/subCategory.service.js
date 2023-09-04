const { SubCategory } = require('../models');

const createSubCategory = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await SubCategory.create(userBody);
   console.log("data",data);
   return data
};

const getSubCategory = async () => {
  try {
    const data = await SubCategory.findAll({
      where: {}
    });
    return data;
  } catch (error) {
    console.error('Subcategory not found!!', error);
  }
};

const getSubCategoryById = async (id) => {
  try {
    const data = await SubCategory.findAll({
      where: {id:id}
    });
    return data;
  } catch (error) {
    console.error('Subcategory not found!!', error);
  }
};

const updateSubCategoryById = async (id, newData) => {
  const findData = await SubCategory.findOne({
    where: id
  });
  if (findData) {
    return SubCategory.update(newData, { where: id });
  } else {
    return;
  }
}


const deleteSubCategoryById = async (id) => {
  return SubCategory.destroy({
    where: id
  });
};

module.exports = {
    createSubCategory,
    getSubCategory,
    updateSubCategoryById,
    deleteSubCategoryById,
    getSubCategoryById
  
};
