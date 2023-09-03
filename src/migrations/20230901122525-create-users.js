module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phoneNumber:{
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      emailVerify:{
        type: Sequelize.STRING

      },
      password: {
        type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
      },
      dob:{
        type: Sequelize.DATE
      },
      role: {
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
  down: (queryInterface) => queryInterface.dropTable('Users')
};
