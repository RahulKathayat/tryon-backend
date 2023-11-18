module.exports = {
    up(queryInterface, Sequelize) {
      return Promise.all([
        queryInterface.addColumn('Users', 'gAuth', {
          type: Sequelize.STRING,
          allowNull: true
        }),
        queryInterface.addColumn('Users', 'gLogin', {
            type: Sequelize.BOOLEAN,
            allowNull: true
          })
      ]);
   
        
        
      },
    down(queryInterface) {
      return Promise.all(
        [queryInterface.removeColumn('Users', 'gAuth'),
        queryInterface.removeColumn('Users', 'gLogin')
    ]);
    }
  };
  