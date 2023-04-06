module.exports = function (sequelize, DataTypes) {
  const Url = sequelize.define('Url', {
    original: {
      allowNull: false,
      type: DataTypes.STRING
    },
    shortened: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'urls',
    engine: 'InnoDB',
    charset: 'utf8',
    timestamps: false
  });

  Url.associate = models => {
    Url.hasMany(models.Request, {
      as: 'requests',
      foreignKey: 'urlId'
    });
  };

  return Url;
};
