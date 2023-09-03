module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('ProductDetails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        productId:{
            type: Sequelize.INTEGER
          },
        description: {
          type: Sequelize.STRING
        },
        size: {
          type: Sequelize.STRING
        },
        colour: {
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
    down: (queryInterface) => queryInterface.dropTable('ProductDetails')
  };
  