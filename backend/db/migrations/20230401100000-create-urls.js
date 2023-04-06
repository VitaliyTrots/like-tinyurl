'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface
      .createTable('urls', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        original: {
          allowNull: false,
          type: Sequelize.STRING(1000)
        },
        shortened: {
          allowNull: false,
          type: Sequelize.STRING
        }
      }, {
        engine: 'InnoDB',
        charset: 'utf8',
        uniqueKeys: {
          original: {
            fields: ['original'],
            customIndex: true
          },
          shortened: {
            fields: ['shortened'],
            customIndex: true
          }
        }
      });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('urls');
  }
};
