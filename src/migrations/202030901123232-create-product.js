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
        onDelete: 'SET Null',
        reference: {
          model: 'Category',
          key: 'id'
        }
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        reference: {
          model: 'SubCategory',
          key: 'id'
        }
      },
      subSubCategoryId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        reference: {
          model: 'SubSubCategory',
          key: 'id'
        }
      },
      fabricId: {
        type: Sequelize.STRING,
        onDelete: 'SET Null',
        reference: {
          model: 'Fabric',
          key: 'id'
        }
      },
      designerName: {
        type: Sequelize.STRING
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
      basePrice: {
        type: Sequelize.INTEGER
      },
      discountPercentage: {
        type: Sequelize.REAL
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
      totalPrice: {
        type: Sequelize.INTEGER
      },
      // averageRating: {
      //   type: Sequelize.DOUBLE
      // },
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
