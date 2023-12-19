module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Ratings', 'orderDetailId', {
        type: Sequelize.INTEGER,
        defaultValue: false
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Ratings', 'orderDetailId')]);
  }
};
