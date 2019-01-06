/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");

const hintBase = configSequelize.define('hint', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    accNumber: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    }
});

class Hint extends hintBase {
    static createHintAccount(userId, accNumber, username) {
        return this.create({
            id_user: userId,
            username: username,
            accNumber: accNumber
          }).catch(err => {
            console.log("Account.addAccount: got error: ", err.message);
            return false;
        });
    } 
    static getHintAccount(userId) {
        return this.findAll({where: {
            id_user: userId
        }})
        .then(hints => {
            let result = [];
            hints.forEach(hint => {
                hint = hint.dataValues;
                result.push(hint);
              });
            return result;
        })
        .catch(err => {
            console.log("Hint.getHintAccount: got error: ", err.message);
            return false;
        })
    }
}

module.exports = { Hint };