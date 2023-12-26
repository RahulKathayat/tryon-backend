module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Orders', 'discountAmount', {
        type: Sequelize.JSON,
        defaultValue: false
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Orders', 'discountAmount')]);
  }
};
