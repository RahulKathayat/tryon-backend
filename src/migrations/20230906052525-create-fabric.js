module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Fabric', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fabricName: {
        type: Sequelize.STRING
      },
      fabricType: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      printType: {
        type: Sequelize.STRING
      },
      usage: {
        type: Sequelize.STRING
      },
      properties: {
        type: Sequelize.STRING
      },
      handle: {
        type: Sequelize.STRING
      },
      construction: {
        type: Sequelize.STRING
      },
      transparency: {
        type: Sequelize.STRING
      },
      reflection: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      maxWidth: {
        type: Sequelize.INTEGER
      },
      gsm: {
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
  down: (queryInterface) => queryInterface.dropTable('Fabric')
};
