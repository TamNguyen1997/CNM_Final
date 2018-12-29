/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");

const {User} = require("./user");

const accountBase = configSequelize.define('account', {
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    number: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    balance: {
      type: Sequelize.INTEGER(15),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: Sequelize.INTEGER(3),
      allowNull: true,
      defaultValue: '0'
    },
    type_account: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'account'
  });

class Account extends accountBase {
  static async addAccount(userID, balance) {
    const user = User.getUser(userID);
    if (!user) return false;
    return this.create({
        user_id: userID,
        balance: balance
      }).catch(err => {
        console.log("Account.addAccount: got error: ", err.message);
        return false;
    });
  } 
}
module.exports = { Account };

