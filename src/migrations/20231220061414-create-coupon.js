module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('DiscountCoupon', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      couponCode: {
        type: Sequelize.STRING,
        unique: true
      },
      description: {
        type: Sequelize.TEXT
      },
      discount: {
        type: Sequelize.REAL,
        defaultValue: 0
      },
      // active: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false
      // },
      // deActive: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false
      // },
      status: {
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
  down: (queryInterface) => queryInterface.dropTable('DiscountCoupon')
};
