/* jshint indent: 2 */
const configSequelize = require("./db");
const Sequelize = require("sequelize");
const {
  sendMail
} = require("../lib/mailer");

const {
  User
} = require("./user");
const {
  Account
} = require("./account");

const DEFAULT_FEE = 1000;
const transactionBasic = configSequelize.define('transaction', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  accountSrc: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  accountDes: {
    type: Sequelize.INTEGER(11),
    allowNull: false
  },
  total: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  },
  description: {
    type: Sequelize.STRING(256),
    allowNull: false,
    defaultValue: ''
  },
  fee: {
    type: Sequelize.INTEGER(11),
    default: DEFAULT_FEE,
  },
  optcode: {
    type: Sequelize.INTEGER(5),
    default: 0
  },
  verify: {
    type: Sequelize.INTEGER(11),
    default: 0
  },
  feeCharger: {
    type: Boolean,
    default: 1
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

class Transaction extends transactionBasic {
  static async createTransaction(accountSrc, accountDes, total, description, feeCharger) {
    if (typeof total !== "number" && total <= 0) {
      return Promise.reject("total can not < 0!")
    };
    //   console.log(accountSrc + "-" + accountDes + "-" + total + "-" + description+ "-" + feeCharger);

    if (feeCharger === false) {
      total -= DEFAULT_FEE
    }
    const desAcc = await Account.getAccount(accountDes)
    if (!desAcc) {
      return Promise.reject("Account des not found")
    }

    const desUser = await User.getUser(desAcc.user_id);

    return this.create({
        accountSrc: accountSrc,
        accountDes: accountDes,
        total: total,
        description: description,
        feeCharger: feeCharger,
        optcode: Math.floor(Math.random() * 90000) + 10000
      })
      .then(trans => {
        const t = trans.dataValues;
        console.log()
        sendMail(desUser.email, desUser.name, t.optcode)
        t.accountDesNumber = desAcc.number;
        delete t.optcode;
        return t;
      })
      .catch(err => {
        console.log("createTransaction: save error ", err.message);
        return false;
      });
  }

  static verifyTransaction(transId, optcode) {
    //   console.log(transId + " - " + optcode );
    return Transaction.findById(transId)
      .then(async (trans) => {
        trans = trans.dataValues;
        if (!trans) return false;

        if (trans.verify) return false;
        if (trans.optcode != optcode) return false;
        let success = true;
        if (trans.feeCharger) {
          success = await Account.updateBalance(trans.accountSrc, trans.total + trans.fee, false)
          if (!success) return false;
          success = await Account.updateBalance(trans.accountDes, trans.total, true)
          if (!success) return false;

        } else {
          success = await Account.updateBalance(trans.accountSrc, trans.total, false)
          if (!success) return false;
          success = await Account.updateBalance(trans.accountDes, trans.total - trans.fee, true)
          if (!success) return false;
        }

        return Transaction.update({ verify: true } , { where : { id: transId}})
          .then(res => res)
          .catch(err => {
            console.log("Transaction.verifyTransaction: got error", err)
            return err.message;
          })
      })
      .catch(err => {
        console.log("Transaction.verifyTransaction: got err", err)
        return err.message;
      })
  }

  static getTransaction(transId) {
    return Transaction.findOne({
        _id: transId,
        verify: true
      })
      .then(async (trans) => {
        if (!trans) return false;
        const t = trans.toObject();
        const accSrc = await Account.getAccount(t.accountSrc);
        if (accSrc) {
          t.accountSrcNumber = accSrc.number;
        }
        const accDes = await Account.getAccount(t.accountDes);
        if (accDes) {
          t.accountDesNumber = accDes.number;
        }

        delete t.verify;
        delete t.optcode;

        return t;
      })
      .catch(err => {
        console.log("Transaction.getTransaction: got err", err)
        return err.message;
      });
  }

  static async getAccountTransactions(accId) {

    return Transaction.findAll({
        where: {
          accountSrc: accId
        }
      })
      .then(transactions => {
        let result = [];
        transactions.forEach(trans => {
          trans = trans.dataValues;
          result.push(trans);
        });
        return result;
      })
      .catch(err => {
        console.log("Transaction.getAccountTransactions: got err", err)
        return err.message;
      });
  }
};

module.exports = {
  Transaction,
  DEFAULT_FEE
};
