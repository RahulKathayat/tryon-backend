module.exports = {
    up(queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn('Product', 'marginAmount', {
          type: Sequelize.DOUBLE,
          allowNull: true
        })
      ]);
    },
    down(queryInterface) {
      return Promise.all([queryInterface.removeColumn('Product', 'marginAmount')]);
    }
  };
  