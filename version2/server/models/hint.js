/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");

const hintBase = configSequelize.define('account', {
    username: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
    number: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
  });


class Hint extends hintBase {
    static createHintAccount(accNumber, username) {
        return this.create({
            username: username,
            accNumber: accNumber
          }).catch(err => {
            console.log("Account.addAccount: got error: ", err.message);
            return false;
        });
      } 
    static getHintAccount(username) {
        return Hint.findById(hintId)
        .then(hint => {
            if (!hint) return false;
            return hint;
        })
        .catch(err => {
            console.log("Hint.getHintAccount: got error: ", err.message);
            return false;
        })
    }
}

module.exports = Hint;