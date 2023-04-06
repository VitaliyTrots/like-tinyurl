const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
const db = {
  Url: require(path.join(__dirname, 'url.model'))(sequelize, Sequelize.DataTypes),
  Request: require(path.join(__dirname, 'request.model'))(sequelize, Sequelize.DataTypes)
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
  if (db[modelName].defineScopes) db[modelName].defineScopes(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
