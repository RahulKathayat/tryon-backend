module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Product', 'averageRating', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Product', 'averageRating')]);
  }
};