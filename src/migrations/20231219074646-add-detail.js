module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('OrderDetails', 'detail', {
        type: Sequelize.JSON,
        defaultValue: false
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('OrderDetails', 'detail')]);
  }
};
