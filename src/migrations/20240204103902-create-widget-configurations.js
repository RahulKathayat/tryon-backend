module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('WidgetConfiguration', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      settings: {
        type: Sequelize.JSON
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
  down: (queryInterface) => queryInterface.dropTable('WidgetConfiguration')
};
