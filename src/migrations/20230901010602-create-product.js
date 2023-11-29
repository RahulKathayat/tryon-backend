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

      brandName: {
        type: Sequelize.STRING
      },
      basePrice: {
        type: Sequelize.INTEGER
      },
      discountPercentage: {
        type: Sequelize.REAL,
        defaultValue: 0
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
        type: Sequelize.DOUBLE
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      currentStock: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      additionalInformation: {
        type: Sequelize.STRING
      },
      sku: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      fabric: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.JSON
      },
      colour: {
        type: Sequelize.JSON
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      upComingDate: {
        type: Sequelize.JSON
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
