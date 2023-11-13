module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Cart', 'addressId', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Cart', 'addressId')]);
  }
};
