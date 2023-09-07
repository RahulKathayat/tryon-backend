const { SubSubCategory,SubCategory,Category} = require('../models');
// const SubSubCategory = require('../models/subSubCategory');

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
      where: {status:true},
      include:[{model:SubCategory},{ model:Category}]
    });
    return data;
  } catch (error) {
    console.error('subSubcategory not found!!', error);
  }
};

const getAllCategories = async () => {
  try {
    const data = await SubSubCategory.findAll({
      where: {status:true},
      include:[{model:SubCategory},{ model:Category}]
    });
    return data;
  } catch (error) {
    console.error('subSubcategory not found!!', error);
  }
};


const getSubSubCategoryById = async (id) => {
  try {
    const data = await SubSubCategory.findAll({
      where: {id:id},
      include:[{model:SubCategory},{ model:Category}]
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


const deleteSubSubCategoryById = async (Id) => {
  try {
    const user = await SubSubCategory.findOne({ where:   Id  });

    if (!user) {
      throw new Error('SubSubCategory not found');
    }
    await user.update({ status: false });

    console.log("SubSubCategory deleted successfully");

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
    getAllCategories
  
};
