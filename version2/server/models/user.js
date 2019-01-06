/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");
const MD5 = require('crypto-js/md5');

const {Hint} = require("./hint");

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
    type: Sequelize.STRING(10),
    allowNull: false,
    defaultValue: 'user'
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  date_of_birth: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: ''
  },
  address: {
    type: Sequelize.STRING(256),
    allowNull: false,
    defaultValue: ''
  },
  phone: {
    type: Sequelize.STRING(11),
    allowNull: false,
    defaultValue: 0
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  status: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    defaultValue: ''
  },
  number_account: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0
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

  static async signUp(username, password, name, phone, email) {
      const encrypted = await MD5(password).toString();

      return this.create({
          username: username,
          password: encrypted,
          name: name,
          phone: phone,
          email: email
        }).catch(err => {
          console.log("Account.addAccount: got error: ", err.message);
          return false;
      });
  }

  static getUser(idUser) {
      return User.findById(idUser)
          .then(user => {
              user = user.dataValues;
              if (!user) return false
              delete user.password;
              return user;
          })
          .catch(err => {
              console.log(`/user/:id -> User.findById: ${err}`);
              return false;
          })
  }

  static getAllUser() {
      return User.findAll({ type: "user" })
          .then(users => {
              let usersFilter = [];
              users.forEach(user => {
                user = user.dataValues;
                delete user.password;
                usersFilter.push(user);
              });
              return usersFilter;
          })
          .catch(err => {
              console.log(`/user/:id -> User.findById: ${err}`);
              return false;
          })
  }
}

module.exports = { User };