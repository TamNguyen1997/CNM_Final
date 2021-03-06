/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");

const {User} = require("./user");

const ACTIVE = true,
      CLOSED = false;

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

  static getAccount(accountId) {
    return Account.find({where: { number: accountId, status: ACTIVE }})
        .then(async (account) => {
            if (!account) return false;
            const acc = account.dataValues;
            const user = await User.getUser(acc.user_id);
            if(!user) {
                acc.owner = "";
                acc.phone = "";
                acc.email = "";
            }

            acc.owner = user.name;
            acc.phone = user.phone;
            acc.email = user.email;
            return acc;
        })
        .catch(err => {
            console.log("Account.find: got error: ", err.message);
            return false;
        });
  };

  // static async getAccountsUser(userID, doerID) {
  static async getAccountsUser(userID) {
    const user = await User.getUser(userID);
    return Account.findAll({where:{ user_id: userID, status: ACTIVE }})
        .then(accounts => {
          accounts = accounts.map((acc) => {
            return acc.dataValues;
          });
            if (user.type === "user" || user.type === "admin") {
                return accounts.map((acc) => {
                    acc.owner = user.name;
                    acc.phone = user.phone;
                    acc.email = user.email;
                    return acc;
                })
            }
        })
        .catch(err => {
            console.log("Account.getAccountsUser: ", err.message);
            return false;
        });
  };

  //type = true: user add balance, type = false: user minus balance
  //default is false
  static async updateBalance(accountId, total, type) {
    type = type || false;
    const account = await this.getAccount(accountId);

    console.log(account);
    if (!account) return false;

    if(total <= 0) return false;

    let newBalance = 0;
    if (type) {
        newBalance = account.balance + total;
    } else {
        if(total >= account.balance) return false;

        newBalance = account.balance - total;
    };
    return Account.update({ balance: newBalance } , { where : { number: accountId}})
        .then(res => res)
        .catch(err => {
            console.log("Account.updateBalance: got error: ", err.message);
            return false
        });
};

  static async doTransaction(accountSrc, accountDes, total) {
    let account;
    //check account exist
    account = await this.getAccount(accountDes);
    if (!account) return false;

    account = await this.getAccount(accountSrc);
    if (!account) return false;

    //check balance
    if(total >= account.balance) return false

    //update balance
    account = await this.updateBalance(accountSrc, total, false);
    if (!account) return false;

    account = await this.updateBalance(accountDes, total, true);
    if (!account) return false;

    let trans = await Transaction.createTransaction(accountSrc, accountDes, total);
    if(!trans) return false;

    return trans;
  };

  static getAccountWithNumber(accNumber) {
    return Account.findOne({ number: accNumber, status: ACTIVE })
    .then(async (account) => {
        if (!account) return false;
        const acc = account.dataValues;

        const user = await User.getUser(acc.user_id);
        if(!user) {
            acc.owner = "";
            acc.phone = "";
            acc.email = "";
        }

        acc.owner = user.name;
        acc.phone = user.phone;
        acc.email = user.email;

        return acc;
    })
    .catch(err => {
        console.log("Account.find: got error: ", err.message);
        return false;
    });  
  }

  static deleteAccount(accountId) {
    return Account.update({ status: CLOSED }, { where: { number: accountId }})
    .then(res => res)
    .catch(err => {
        console.log("Account.deleteAccount: got error: ", err.message);
        return false
    });
  }
}


module.exports = { Account };

