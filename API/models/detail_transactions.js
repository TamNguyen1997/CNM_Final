const sequelize = require("./db");
const Sequelize = require("sequelize");

const DetailTransactions = sequelize.define("detail_transactions", {
    amount_money: {type: Sequelize.INTEGER},
    fee_payment: {type: Sequelize.INTEGER},
    id_tranaction: {type: Sequelize.INTEGER},
    type_balance: {type: Sequelize.INTEGER},
},{
    timestamps: false,
    tableName: "detail_transactions"
});

module.exports = {DetailTransactions};