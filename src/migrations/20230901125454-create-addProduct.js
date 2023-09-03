module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('AddProduct', {
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
        type: {
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
    down: (queryInterface) => queryInterface.dropTable('AddProduct')
  };
  