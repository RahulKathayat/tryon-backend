module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Product', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        productName: {
          type: Sequelize.STRING
        },
        productNumber:{
          type: Sequelize.INTEGER
        },
        brandName: {
          type: Sequelize.STRING
        },
        originalPrice: {
          type: Sequelize.INTEGER
        },
        discountedPrice: {
            type: Sequelize.INTEGER
          },
        categoryId:{
          type: Sequelize.INTEGER
        },
        subCategoryId:{
            type: Sequelize.INTEGER
          },
        subSubCategoryId:{
            type: Sequelize.INTEGER
          },
        image:{
          type: Sequelize.STRING
        },
        featuredImage:{
          type: Sequelize.STRING

        },
        trendingProduct:{
          type: Sequelize.BOOLEAN
        },
        status: {
          type: Sequelize.BOOLEAN
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),
    down: (queryInterface) => queryInterface.dropTable('Product')
  };
  