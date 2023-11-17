module.exports = {
    up(queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn('Orders', 'totalAmount', {
          type: Sequelize.INTEGER,
          allowNull: true
        }),

        queryInterface.addColumn('Orders', 'orderDetails', {
          type: Sequelize.JSON,
          allowNull: true
        })
      ]);
    },
    down(queryInterface) {
      return Promise.all([
        queryInterface.removeColumn('Orders', 'totalAmount'),
        queryInterface.removeColumn('Orders', 'orderDetails')
      ]);
    }
  };
  