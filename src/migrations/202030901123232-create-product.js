module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        onDelte: 'SET Null',
        reference: {
          model: 'Category',
          key: 'id'
        }
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        onDelte: 'SET Null',
        reference: {
          model: 'SubCategory',
          key: 'id'
        }
      },
      subSubCategoryId: {
        type: Sequelize.INTEGER,
        onDelte: 'SET Null',
        reference: {
          model: 'SubSubCategory',
          key: 'id'
        }
      },
      productName: {
        type: Sequelize.STRING
      },
      productNumber: {
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
      image: {
        type: Sequelize.JSON
      },
      featuredImage: {
        type: Sequelize.JSON
      },
      productType: {
        type: Sequelize.INTEGER
      },
      length: {
        type: Sequelize.INTEGER
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
