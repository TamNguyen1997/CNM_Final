/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");

const Transaction = configSequelize.define('transaction', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  account_src: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  account_des: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'transaction'
});

module.exports = { Transaction };
