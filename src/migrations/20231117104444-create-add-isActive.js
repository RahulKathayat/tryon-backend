module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),

      queryInterface.addColumn('Product', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('OrderDetails', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('Orders', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('Refund', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('Ratings', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('WishList', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('Category', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('Address', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('SubCategory', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('Fabric', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('ProductFabric', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('Cart', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('SubscribedUser', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('paymentLog', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      queryInterface.addColumn('SubSubCategory', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      })
    ]);
  },
  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'isActive'),
      queryInterface.removeColumn('Product', 'isActive'),
      queryInterface.removeColumn('OrderDetails', 'isActive'),
      queryInterface.removeColumn('Orders', 'isActive'),
      queryInterface.removeColumn('Refund', 'isActive'),
      queryInterface.removeColumn('Ratings', 'isActive'),
      queryInterface.removeColumn('WishList', 'isActive'),
      queryInterface.removeColumn('Category', 'isActive'),
      queryInterface.removeColumn('Address', 'isActive'),
      queryInterface.removeColumn('SubCategory', 'isActive'),
      queryInterface.removeColumn('Fabric', 'isActive'),
      queryInterface.removeColumn('ProductFabric', 'isActive'),
      queryInterface.removeColumn('Cart', 'isActive'),
      queryInterface.removeColumn('SubscribedUser', 'isActive'),
      queryInterface.removeColumn('paymentLog', 'isActive'),
      queryInterface.removeColumn('SubSubCategory', 'isActive')
    ]);
  }
};

// isActive-Toggle
// status false--not get
// user----status true ad isActive true
// admin
