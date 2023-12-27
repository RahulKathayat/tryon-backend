module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Cart', 'couponCode', {
        type: Sequelize.TEXT
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Cart', 'couponCode')]);
  }
};
