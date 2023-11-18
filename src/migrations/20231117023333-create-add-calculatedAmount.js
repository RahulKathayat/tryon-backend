module.exports = {
    up(queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn('OrderDetails', 'calculatedAmount', {
          type: Sequelize.INTEGER,
          allowNull: true
        })
      ]);
    },
    down(queryInterface) {
      return Promise.all([queryInterface.removeColumn('OrderDetails', 'calculatedAmount')]);
    }
  };
  