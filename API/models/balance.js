const sequelize = require("./db");
const Sequelize = require("sequelize");

const Balance = sequelize.define("Balance", {
    amount_money: {type: Sequelize.INTEGER},
    content: {type: Sequelize.STRING},
    id_type_content: {type: Sequelize.INTEGER},
    id_user: {type: Sequelize.INTEGER},
},{
    timestamps: false,
    tableName: "Balance"
});

module.exports = {Balance};