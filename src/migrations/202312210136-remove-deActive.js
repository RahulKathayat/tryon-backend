module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('DiscountCoupon', 'status', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('DiscountCoupon', 'status')]);
  }
};
