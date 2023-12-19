module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('OrderDetails', 'reviewed', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('OrderDetails', 'reviewed')]);
  }
};
