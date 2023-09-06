module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('SubCategory', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        categoryId:{
            type: Sequelize.INTEGER
        },
        subCategoryName:{
            type: Sequelize.STRING
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
    down: (queryInterface) => queryInterface.dropTable('SubCategory')
  };
  