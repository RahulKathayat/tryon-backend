module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('OrderDetails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        type:{
            type:Sequelize.STRING
        },
        amount:{
            type:Sequelize.INTEGER
        },
        trackingId:{
          type:Sequelize.STRING

        },
        trackingLink:{
          type:Sequelize.STRING

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
    down: (queryInterface) => queryInterface.dropTable('OrderDetails')
  };
  