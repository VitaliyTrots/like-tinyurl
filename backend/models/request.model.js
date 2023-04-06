module.exports = function (sequelize, DataTypes) {
  const Request = sequelize.define('Request', {
    urlId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'urls',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    ip: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'requests',
    engine: 'InnoDB',
    charset: 'utf8',
    updatedAt: false
  });

  Request.associate = models => {
    Request.belongsTo(models.Url, {
      as: 'url',
      foreignKey: 'urlId'
    });
  };

  return Request;
};
