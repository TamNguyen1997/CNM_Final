/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");

const userBase = configSequelize.define('user', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  type: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  },
  name_user: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  date_of_birth: {
    type: Sequelize.DATE,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING(256),
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER(3),
    allowNull: false
  },
  number_account: {
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
  tableName: 'user'
});
class User extends userBase {
  static async getUser(userId) {
    return User.findAll({
        where:{
            id: userId
        }
    })
  }
}

module.exports = { User };