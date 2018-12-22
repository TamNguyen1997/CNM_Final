const Sequelize = require("./db");

const DetailTransactions = Sequelize.define("detail_transactions", {
    amount_money: {type: Sequelize.INT},
    fee_payment: {type: Sequelize.INT},
    id_tranaction: {type: Sequelize.INT},
    type_balance: {type: Sequelize.INT},
},{
    timestamps: false,
    tableName: "detail_transactions"
});

module.exports = {DetailTransactions};