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
        type: Sequelize.INTEGER,
        onDelte: 'SET Null',
        reference: {
          model: 'Fabric',
          key: 'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        onDelte: 'SET Null',
        reference: {
          model: 'Product',
          key: 'id'
        }
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
