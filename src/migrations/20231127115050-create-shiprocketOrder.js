module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('shiprocketOrder', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      orderDetailId: {
        type: Sequelize.INTEGER
      },
      shiprocketResponse: {
        type: Sequelize.JSON
      },
      awbCode:{
        type:Sequelize.STRING
      },
      orderType:{
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
  down: (queryInterface) => queryInterface.dropTable('shiprocketOrder')
};
