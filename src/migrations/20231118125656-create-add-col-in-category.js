module.exports = {
    up(queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn('Category', 'isFeatured', {
          type: Sequelize.BOOLEAN,
          allowNull: true
        }),
        queryInterface.addColumn('Category', 'isFrequent', {
            type: Sequelize.INTEGER,
          })
      ]);
   
    },
    down(queryInterface) {
      return Promise.all(
        [queryInterface.removeColumn('Category', 'isFeatured'),
        queryInterface.removeColumn('Category', 'isFrequent')
    ]);
    }
  };
  