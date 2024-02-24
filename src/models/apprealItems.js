module.exports = (sequelize, DataTypes) => {
    const ApparelItem = sequelize.define('ApparelItem', {
portalId: {
    type: DataTypes.INTEGER,
    onDelete: 'SET NULL',
    references: {
      model: 'Portal',
      key: 'id'
    }
  },
  imageUrl: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
},
{
  tableName: 'ApparelItem',
  freezeTableName: true
}
);

return ApparelItem;
};