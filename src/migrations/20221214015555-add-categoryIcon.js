module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Category', 'icon', {
        type: Sequelize.TEXT,
        allowNull: true
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Category', 'icon')]);
  }
};
