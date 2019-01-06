/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");

const DetailTransaction = configSequelize.define('detail_transaction', {
  id_tranaction: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  type_balance: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  },
  amount_money: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  fee_payment: {
    type: Sequelize.INTEGER(3),
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
  // fee_payment: {
  //   type: Sequelize.INTEGER(3),
  //   allowNull: false
  // },
}, {
  tableName: 'detail_transaction'
});

module.exports = { DetailTransaction };
