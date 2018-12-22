const Sequelize = require("./db");

const Balance = Sequelize.define("Balance", {
    amount_money: {type: Sequelize.INT},
    content: {type: Sequelize.STRING},
    id_type_content: {type: Sequelize.INT},
    id_user: {type: Sequelize.INT},
},{
    timestamps: false,
    tableName: "Balance"
});

module.exports = {Balance};