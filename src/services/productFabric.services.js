const { ProductFabric,Fabric,Product } = require('../models');

const createProductFabric = async (_userBody) => {
  const userBody = _userBody;
  console.log("===============",userBody);
   const data= await ProductFabric.create(userBody);
   console.log("data",data);
   return data
};

const getProductFabric = async (query, options) => {

  const limit = Number(options.limit) ;
  const offset = options.page ? limit * (options.page - 1) : 0;
  const support = await ProductFabric.findAndCountAll({
    where:  query,
    order: [['updatedAt', 'DESC']],
    include:[{model:Fabric},{model:Product}],
    limit,
    offset
  });
  return support;
};


const getProductFabricById = async (id) => {
  try {
    const data = await ProductFabric.findAll({
      where: {id:id},
      include:[{model:Fabric},{model:Product}]

    });
    return data;
  } catch (error) {
    console.error('productFabric not found!!', error);
  }
};

const updateProductFabricById = async (id, newData) => {
  const findData = await ProductFabric.findOne({
    where: id
  });
  if (findData) {
    return ProductFabric.update(newData, { where: id });
  } else {
    return;
  }
}


const deleteProductFabricById = async (Id) => {
    try {
      const user = await ProductFabric.findOne({ where:   Id  });
  
      if (!user) {
        throw new Error('ProductFabric not found');
      }
      await user.update({ status: false });
  
      console.log("ProductFabric deleted successfully");
  
      return { message: 'ProductFabric deleted successfully' };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

module.exports = {
    createProductFabric,
    getProductFabric,
    updateProductFabricById,
    deleteProductFabricById,
    getProductFabricById
  
};
