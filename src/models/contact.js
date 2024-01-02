module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.BIGINT
      },
      subject: {
        type: DataTypes.TEXT
      },
      message: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      tableName: 'Contact'
    }
  );
  return Contact;
};
