const { SubSubCategory } = require('../models');

const createSubSubCategory = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await SubSubCategory.create(userBody);
   console.log("data",data);
   return data
};

const getSubSubCategory = async () => {
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
      where: {id:id}
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
}


const deleteSubSubCategoryById = async (id) => {
  return SubSubCategory.destroy({
    where: id
  });
};

module.exports = {
    createSubSubCategory,
    getSubSubCategory,
    updateSubSubCategoryById,
    deleteSubSubCategoryById,
    getSubSubCategoryById
  
};
