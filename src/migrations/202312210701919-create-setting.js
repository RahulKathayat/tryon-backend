module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Setting', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DISCOUNT_BANNER: {
        type: Sequelize.JSON
      },
      CMS: {
        type: Sequelize.TEXT
      },
      STATUS: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
  down: (queryInterface) => queryInterface.dropTable('Setting')
};
