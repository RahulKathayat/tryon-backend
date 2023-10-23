module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('WishList', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        reference: {
          model: 'Product',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET Null',
        references: {
          model: 'Users',
          key: 'id'
        }
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
  down: (queryInterface) => queryInterface.dropTable('WishList')
};
