'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('requests', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        urlId: {
          field: 'url_id',
          references: {
            model: 'urls',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: false,
          type: Sequelize.INTEGER
        },
        ip: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          field: 'created_at',
          allowNull: false,
          type: Sequelize.DATE
        }
      }, {
        engine: 'InnoDB',
        charset: 'utf8',
        indexes: {
          urlId: {
            fields: ['url_id'],
            customIndex: true
          },
          ip: {
            fields: ['ip'],
            customIndex: true
          },
          createdAt: {
            fields: ['created_at'],
            customIndex: true
          }
        }
      });
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('requests');
  }
};
