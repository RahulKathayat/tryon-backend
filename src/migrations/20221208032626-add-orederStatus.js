module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Orders', 'orderStatus', {
        type: Sequelize.TEXT,
        defaultValue: 'In Process'
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Orders', 'orderStatus')]);
  }
};
