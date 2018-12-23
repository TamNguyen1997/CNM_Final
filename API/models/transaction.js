const sequelize = require("./db");
const Sequelize = require("sequelize");

const Transaction = sequelize.define("transaction", {
    from_user: {type: Sequelize.INTEGER},
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    to_user: {type: Sequelize.INTEGER},
},{
    timestamps: false,
    tableName: "transaction"
});

module.exports = {Transaction};