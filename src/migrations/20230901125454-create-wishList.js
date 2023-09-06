module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('WishList', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        productId:{
            type: Sequelize.INTEGER
          },
        productDetailId:{
            type: Sequelize.INTEGER
          },
        userId:{
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
    down: (queryInterface) => queryInterface.dropTable('WishList')
  };
  