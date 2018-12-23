const sequelize = require("./db");
const Sequelize = require("sequelize");

const TypeBalance = sequelize.define("type_balance", {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
},{
    timestamps: false,
    tableName: "type_balance"
});

module.exports = {TypeBalance};