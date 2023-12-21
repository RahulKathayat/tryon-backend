module.exports = (sequelize, DataTypes) => {
  const DiscountCoupon = sequelize.define(
    'DiscountCoupon',
    {
      couponCode: {
        type: DataTypes.TEXT,
        unique: true
      },
      description: {
        type: DataTypes.STRING
      },
      discount: {
        type: DataTypes.REAL,
        defaultValue: 0
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      deActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      tableName: 'DiscountCoupon',
      freezeTableName: true
    }
  );

  return DiscountCoupon;
};
