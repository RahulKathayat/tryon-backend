module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('ProductFabric', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        fabricId: {
          type: Sequelize.INTEGER
        },
        productId: {
            type: Sequelize.INTEGER
        },
        defaultFabric: {
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
    down: (queryInterface) => queryInterface.dropTable('ProductFabric')
  };
  