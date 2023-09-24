const { subCategoryController } = require('../controllers');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('SubSubCategory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        onDelte: 'SET Null',
        reference: {
          model: 'SubCategory',
          key: 'id'
        }
      },
      subSubCategoryName: {
        type: Sequelize.STRING
      },
      image: {
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
  down: (queryInterface) => queryInterface.dropTable('SubSubCategory')
};
