const { SubCategory,Category } = require('../models');

const createSubCategory = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await SubCategory.create(userBody);
   console.log("data",data);
   return data
};

const getSubCategory = async (query, options) => {

  const limit = Number(options.limit) ;
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await SubCategory.findAndCountAll({
    where:  query,
    order: [['updatedAt', 'DESC']],
    include:[{model:Category}],
    limit,
    offset
  });
  return support;
};


const getAllSubCategory = async (query, options) => {
  try {
    const data = await SubCategory.findAll({
      where: {},
    });
    return data;
  } catch (error) {
    console.error('subSubcategory not found!!', error);
  }
};



const getSubCategoryById = async (id) => {
  try {
     const data = await SubCategory.findOne({
      where: {id:id},
      include: [{ model: Category }]
    });
    console.log("data=============================",data);
    return data;
  } catch (error) {
    console.error('Subcategory not found!!', error);
  }
};

const updateSubCategoryById = async (id, newData) => {
  const findData = await SubCategory.findOne({
    where: id,
  });
  if (findData) {
    return SubCategory.update(newData, { where: id });
  } else {
    return;
  }
}

const deleteSubCategoryById = async (Id) => {
  try {
    const user = await SubCategory.findOne({ where:   Id  });

    if (!user) {
      throw new Error('SubCategory not found');
    }
    await user.update({ status: false });

    console.log("SubCategory deleted successfully");

    return { message: 'SubCategory deleted successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
    createSubCategory,
    getSubCategory,
    updateSubCategoryById,
    deleteSubCategoryById,
    getSubCategoryById,
    getAllSubCategory
  
};
