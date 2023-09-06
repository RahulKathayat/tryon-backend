module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Cart', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER
        },
        cartDetail: {
            type: Sequelize.JSON
        },
        totalAmount: {
            type: Sequelize.INTEGER
        },
        totalItems: {
            type: Sequelize.INTEGER
        },
        totalQuantity: {
            type: Sequelize.INTEGER
        },
        discountCode: {
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
    down: (queryInterface) => queryInterface.dropTable('Cart')
  };
  