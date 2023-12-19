module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Product', 'upComingImg', {
        type: Sequelize.TEXT,
        allowNull: true
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([queryInterface.removeColumn('Product', 'upComingImg')]);
  }
};
