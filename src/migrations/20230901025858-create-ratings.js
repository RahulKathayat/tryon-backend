module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Ratings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER
        },
        orderId: {
            type: Sequelize.INTEGER
        },
        review:{
            type:Sequelize.STRING
        },
        ratings:{
            type:Sequelize.INTEGER
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
    down: (queryInterface) => queryInterface.dropTable('Ratings')
  };
  